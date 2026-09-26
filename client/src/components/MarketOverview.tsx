import { ArrowUpRight, Radio } from "lucide-react";
import { useEffect, useState } from "react";

type Coin = { id: string; symbol: string; name: string; color: string; points: string };
type Price = { usd?: number; usd_24h_change?: number; last_updated_at?: number };
const coins: Coin[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", color: "#f7931a", points: "0,44 12,41 25,45 38,29 50,34 63,19 76,24 91,9" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", color: "#627eea", points: "0,47 12,39 25,42 38,28 50,31 63,23 76,19 91,12" },
  { id: "solana", symbol: "SOL", name: "Solana", color: "#14f195", points: "0,42 12,36 25,40 38,23 50,29 63,18 76,22 91,8" },
  { id: "cardano", symbol: "ADA", name: "Cardano", color: "#3468d4", points: "0,18 12,25 25,21 38,34 50,29 63,40 76,32 91,45" },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche", color: "#e84142", points: "0,46 12,42 25,44 38,31 50,34 63,25 76,20 91,13" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", color: "#c2a633", points: "0,41 12,38 25,34 38,36 50,27 63,22 76,17 91,11" },
];
function MiniChart({ points, positive }: { points: string; positive: boolean }) { return <svg className={`mini-chart ${positive ? "up" : "down"}`} viewBox="0 0 100 55" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} fill="none" vectorEffect="non-scaling-stroke" /></svg>; }
const money = (value?: number) => value == null ? "Price unavailable" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: value < 1 ? 4 : 2 }).format(value);
export default function MarketOverview() {
  const [prices, setPrices] = useState<Record<string, Price>>({}); const [updated, setUpdated] = useState("Connecting…");
  useEffect(() => { const controller = new AbortController(); fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.map((coin) => coin.id).join(",")}&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true`, { signal: controller.signal }).then((response) => { if (!response.ok) throw new Error("Market feed unavailable"); return response.json(); }).then((data) => { setPrices(data); const timestamp = Math.max(...Object.values(data as Record<string, Price>).map((item) => item.last_updated_at ?? 0)); setUpdated(timestamp ? new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Live"); }).catch(() => setUpdated("Feed temporarily unavailable")); return () => controller.abort(); }, []);
  return <section className="market-overview section-pad"><div className="container"><div className="market-heading"><div><p className="eyebrow"><span className="eyebrow-dot" /> Live digital asset pulse</p><h2>See the signal<br /><em>in motion.</em></h2></div><p>Follow current cryptocurrency prices and 24-hour movement through a clean market view powered by CoinGecko.</p></div><div className="market-status"><span><Radio size={13} /> Live pricing</span><small>Updated · {updated}</small><a href="/market">Explore full market <ArrowUpRight size={15} /></a></div><div className="market-grid">{coins.map((coin, index) => { const price = prices[coin.id]; const change = price?.usd_24h_change; const positive = (change ?? 0) >= 0; return <article className="market-card" key={coin.symbol} style={{ "--delay": `${index * 70}ms`, "--asset-color": coin.color } as React.CSSProperties}><div className="asset-top"><span className="asset-logo">{coin.symbol.slice(0, 1)}</span><div><strong>{coin.name}</strong><small>{coin.symbol} · Crypto</small></div><span className="asset-arrow">↗</span></div><div className="asset-price"><strong>{money(price?.usd)}</strong><span className={positive ? "gain" : "loss"}>{change == null ? "—" : `${positive ? "+" : ""}${change.toFixed(2)}%`}</span></div><MiniChart points={coin.points} positive={positive} /></article>; })}</div><p className="market-source">Live market data supplied by CoinGecko. Prices may be delayed or temporarily unavailable.</p></div></section>;
}
