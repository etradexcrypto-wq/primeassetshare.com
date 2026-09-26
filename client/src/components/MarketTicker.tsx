import { useEffect, useMemo, useState } from "react";

type MarketItem = { label: string; symbol: string; logo: string; price?: string; change?: number };
type MarketRow = { name: string; direction: "left" | "right"; items: MarketItem[] };

const logo = (path: string) => path.startsWith("https://") ? path : `https://s3-symbol-logo.tradingview.com/${path}`;

const initialRows: MarketRow[] = [
  { name: "FOREX", direction: "left", items: [
    { label: "EUR / USD", symbol: "EURUSD=X", logo: "country/EU--big.svg", price: "1.08" },
    { label: "GBP / USD", symbol: "GBPUSD=X", logo: "country/GB--big.svg", price: "1.27" },
    { label: "USD / JPY", symbol: "JPY=X", logo: "country/US--big.svg", price: "149.80" },
    { label: "AUD / USD", symbol: "AUDUSD=X", logo: "country/AU--big.svg", price: "0.66" },
    { label: "GBP / EUR", symbol: "GBPEUR=X", logo: "country/GB--big.svg", price: "1.17" },
  ] },
  { name: "INDICES", direction: "right", items: [
    { label: "S&P 500", symbol: "^GSPC", logo: "indices/s-and-p-500.svg", price: "5,620" },
    { label: "NASDAQ 100", symbol: "^NDX", logo: "indices/nasdaq-100.svg", price: "19,450" },
    { label: "DOW JONES", symbol: "^DJI", logo: "country/US--big.svg", price: "41,200" },
    { label: "FTSE 100", symbol: "^FTSE", logo: "country/GB--big.svg", price: "8,280" },
    { label: "NIKKEI 225", symbol: "^N225", logo: "indices/nikkei-225.svg", price: "38,600" },
  ] },
  { name: "COMMODITIES", direction: "left", items: [
    { label: "GOLD", symbol: "GC=F", logo: "metal/gold--big.svg", price: "$2,360" },
    { label: "SILVER", symbol: "SI=F", logo: "metal/silver--big.svg", price: "$31.20" },
    { label: "COPPER", symbol: "HG=F", logo: "metal/copper--big.svg", price: "$4.35" },
    { label: "BRENT CRUDE", symbol: "BZ=F", logo: "https://cdn-icons-png.flaticon.com/512/8381/8381029.png", price: "$82.10" },
    { label: "NATURAL GAS", symbol: "NG=F", logo: "https://cdn-icons-png.flaticon.com/512/2933/2933116.png", price: "$2.75" },
  ] },
  { name: "CRYPTO", direction: "right", items: [
    { label: "BITCOIN", symbol: "bitcoin", logo: "crypto/XTVCBTC.svg", price: "$67,482" },
    { label: "ETHEREUM", symbol: "ethereum", logo: "crypto/XTVCETH.svg", price: "$3,482" },
    { label: "SOLANA", symbol: "solana", logo: "crypto/XTVCSOL.svg", price: "$168" },
    { label: "XRP", symbol: "ripple", logo: "crypto/XTVCXRP.svg", price: "$0.52" },
    { label: "USDC", symbol: "usd-coin", logo: "crypto/XTVCUSDC.svg", price: "$1.00" },
  ] },
];

function formatPrice(value: number, prefix = "") {
  if (!Number.isFinite(value)) return undefined;
  const digits = value >= 1000 ? 0 : value >= 10 ? 2 : 4;
  return `${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: digits })}`;
}

async function yahooQuote(symbol: string) {
  try {
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`);
    const json = await response.json();
    const meta = json.chart?.result?.[0]?.meta;
    const price = Number(meta?.regularMarketPrice ?? meta?.chartPreviousClose);
    const previous = Number(meta?.chartPreviousClose ?? price);
    return { price, change: previous ? ((price - previous) / previous) * 100 : 0 };
  } catch {
    return null;
  }
}

export default function MarketTicker() {
  const [rows, setRows] = useState(initialRows);
  const allItems = useMemo(() => initialRows.flatMap((row) => row.items), []);

  useEffect(() => {
    let active = true;
    async function loadLiveMarkets() {
      const next = initialRows.map((row) => ({ ...row, items: row.items.map((item) => ({ ...item })) }));
      try {
        const [forexResponse, cryptoResponse] = await Promise.all([
          fetch("https://open.er-api.com/v6/latest/USD"),
          fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,usd-coin&vs_currencies=usd&include_24hr_change=true"),
        ]);
        const forex = await forexResponse.json();
        const crypto = await cryptoResponse.json();
        const rates = forex.rates ?? {};
        const forexValues: Record<string, number> = {
          "EUR / USD": rates.EUR ? 1 / rates.EUR : NaN,
          "GBP / USD": rates.GBP ? 1 / rates.GBP : NaN,
          "USD / JPY": rates.JPY,
          "AUD / USD": rates.AUD ? 1 / rates.AUD : NaN,
          "GBP / EUR": rates.EUR && rates.GBP ? rates.EUR / rates.GBP : NaN,
        };
        next[0].items.forEach((item) => { item.price = formatPrice(forexValues[item.label]); });
        const cryptoMap: Record<string, { usd?: number; usd_24h_change?: number }> = crypto;
        next[3].items.forEach((item) => {
          const current = cryptoMap[item.symbol];
          if (current?.usd) { item.price = formatPrice(current.usd, "$" ); item.change = current.usd_24h_change; }
        });
      } catch { /* keep the useful initial snapshot */ }

      const quoteItems = allItems.filter((item) => item.symbol.includes("=") || item.symbol.startsWith("^"));
      const quotes = await Promise.all(quoteItems.map(async (item) => [item.symbol, await yahooQuote(item.symbol)] as const));
      const quoteMap = new Map(quotes);
      next.forEach((row) => row.items.forEach((item) => {
        const quote = quoteMap.get(item.symbol);
        if (quote?.price) { item.price = formatPrice(quote.price, item.symbol.includes("=") && item.symbol.endsWith("=F") ? "$" : ""); item.change = quote.change; }
      }));
      if (active) setRows(next);
    }
    loadLiveMarkets();
    const timer = window.setInterval(loadLiveMarkets, 60000);
    return () => { active = false; window.clearInterval(timer); };
  }, [allItems]);

  return <section className="market-ticker"><div className="container"><div className="ticker-title"><span>LIVE MARKET PULSE</span><strong>WORLDWIDE</strong></div><p className="ticker-lede">Live public-market prices across currencies, indices, commodities, and digital assets. Values may be delayed.</p><div className="ticker-container">{rows.map((row) => <div className={`ticker-row ticker-${row.direction}`} key={row.name}>{[...row.items, ...row.items].map((item, index) => <div className="ticker-item" key={`${row.name}-${item.label}-${index}`}><img src={logo(item.logo)} alt="" loading="lazy" /><span><b>{item.label}</b><small>{item.price ?? "Updating"}{item.change === undefined ? "" : ` · ${item.change >= 0 ? "+" : ""}${item.change.toFixed(2)}%`}</small></span></div>)}</div>)}</div></div></section>;
}
