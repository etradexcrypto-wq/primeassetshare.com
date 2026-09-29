import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
} from "lucide-react";

type Candle = {
  o: number;
  h: number;
  l: number;
  c: number;
};

type Quote = {
  symbol: string;
  name: string;
  change: number;
  candles: Candle[];
  tone: "up" | "down";
  live: boolean;
};

/* ─────────────────────────────────────────────────────────────
   CoinGecko API — inline configuration
   ───────────────────────────────────────────────────────────── */

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

/*
 * Optional: paste your CoinGecko Demo API key here to raise
 * rate limits. Leave empty string to use the public endpoint.
 *
 * ⚠️ This key is visible to anyone who views the page source.
 *    Only use a Demo key here, never a paid/production key.
 */
const COINGECKO_API_KEY = "";

/* ─────────────────────────────────────────────────────────────
   Candlestick Chart
   ───────────────────────────────────────────────────────────── */

function CandleChart({
  candles,
  tone,
}: {
  candles: Candle[];
  tone: "up" | "down";
}) {
  const width = 240;
  const height = 90;
  const padX = 4;
  const padY = 6;

  if (!candles.length) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: "block" }}
      />
    );
  }

  const highs = candles.map((c) => c.h);
  const lows = candles.map((c) => c.l);

  const max = Math.max(...highs);
  const min = Math.min(...lows);

  const range = max - min || 1;

  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const step = innerW / candles.length;
  const bodyW = Math.max(2, step * 0.6);

  const y = (value: number) =>
    padY + innerH - ((value - min) / range) * innerH;

  const upColor = "#26a69a";
  const downColor = "#ef5350";

  const lastCandle = candles[candles.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {[0.25, 0.5, 0.75].map((p) => (
        <line
          key={p}
          x1={0}
          x2={width}
          y1={padY + innerH * p}
          y2={padY + innerH * p}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
        />
      ))}

      {candles.map((candle, index) => {
        const x = padX + index * step + step / 2;
        const isUp = candle.c >= candle.o;
        const color = isUp ? upColor : downColor;

        const bodyTop = y(Math.max(candle.o, candle.c));
        const bodyBottom = y(Math.min(candle.o, candle.c));

        return (
          <g key={index}>
            <line
              x1={x}
              x2={x}
              y1={y(candle.h)}
              y2={y(candle.l)}
              stroke={color}
              strokeWidth={1}
            />
            <rect
              x={x - bodyW / 2}
              y={bodyTop}
              width={bodyW}
              height={Math.max(1, bodyBottom - bodyTop)}
              fill={color}
              stroke={color}
              strokeWidth={0.5}
            />
          </g>
        );
      })}

      <line
        x1={0}
        x2={width}
        y1={y(lastCandle.c)}
        y2={y(lastCandle.c)}
        stroke={tone === "up" ? upColor : downColor}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.6}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Fallback sample candles (used only if the API is unavailable)
   ───────────────────────────────────────────────────────────── */

function seedCandles(
  seed: number,
  count = 40,
  base = 100
): Candle[] {
  let rand = seed;

  const next = () => {
    rand = (rand * 9301 + 49297) % 233280;
    return rand / 233280;
  };

  const candles: Candle[] = [];
  let price = base;

  for (let i = 0; i < count; i++) {
    const o = price;

    const c = Math.max(1, o + (next() - 0.5) * base * 0.04);

    candles.push({
      o,
      c,
      h: Math.max(o, c) + next() * base * 0.02,
      l: Math.min(o, c) - next() * base * 0.02,
    });

    price = c;
  }

  return candles;
}

/* ─────────────────────────────────────────────────────────────
   Initial cards
   ───────────────────────────────────────────────────────────── */

const sampleQuotes: Quote[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    change: 0,
    tone: "up",
    candles: seedCandles(11, 40, 67000),
    live: false,
  },
  {
    symbol: "AAPL",
    name: "Apple",
    change: 0,
    tone: "down",
    candles: seedCandles(23, 40, 227),
    live: false,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    change: 0,
    tone: "up",
    candles: seedCandles(37, 40, 131),
    live: false,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    change: 0,
    tone: "down",
    candles: seedCandles(51, 40, 3482),
    live: false,
  },
];

/* ─────────────────────────────────────────────────────────────
   Convert CoinGecko price history to candles
   ───────────────────────────────────────────────────────────── */

function pricesToCandles(prices: [number, number][]): Candle[] {
  const recent = prices.slice(-40);

  if (!recent.length) return [];

  return recent.map(([, price], index) => {
    const close = Number(price);
    const previous = index > 0 ? Number(recent[index - 1][1]) : close;
    const open = previous;
    const movement = Math.abs(close - open) || close * 0.001;
    const high = Math.max(open, close) + movement * 0.5;
    const low = Math.max(0, Math.min(open, close) - movement * 0.5);

    return {
      o: open,
      h: high,
      l: low,
      c: close,
    };
  });
}

/* ─────────────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────────────── */

export default function LiveMarketLines({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [quotes, setQuotes] = useState<Quote[]>(sampleQuotes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const headers: HeadersInit = {
          accept: "application/json",
        };

        if (COINGECKO_API_KEY) {
          headers["x-cg-demo-api-key"] = COINGECKO_API_KEY;
        }

        /* 1. Live BTC + ETH prices */
        const priceResponse = await fetch(
          `${COINGECKO_BASE}/simple/price` +
            `?ids=bitcoin,ethereum` +
            `&vs_currencies=usd` +
            `&include_24hr_change=true` +
            `&include_last_updated_at=true`,
          { headers }
        );

        if (!priceResponse.ok) {
          throw new Error(`CoinGecko returned ${priceResponse.status}`);
        }

        const priceData = await priceResponse.json();
        const btc = priceData?.bitcoin;
        const eth = priceData?.ethereum;

        if (!btc?.usd || !eth?.usd) {
          throw new Error("CoinGecko returned incomplete price data");
        }

        /* 2. Live BTC + ETH chart data */
        const [btcChartResponse, ethChartResponse] = await Promise.all([
          fetch(
            `${COINGECKO_BASE}/coins/bitcoin/market_chart` +
              `?vs_currency=usd&days=1&interval=hourly`,
            { headers }
          ),
          fetch(
            `${COINGECKO_BASE}/coins/ethereum/market_chart` +
              `?vs_currency=usd&days=1&interval=hourly`,
            { headers }
          ),
        ]);

        if (!btcChartResponse.ok || !ethChartResponse.ok) {
          throw new Error("CoinGecko chart data unavailable");
        }

        const btcChart = await btcChartResponse.json();
        const ethChart = await ethChartResponse.json();

        const btcCandles = pricesToCandles(btcChart?.prices ?? []);
        const ethCandles = pricesToCandles(ethChart?.prices ?? []);

        /* 3. 24h percentage changes */
        const btcChange = Number(btc.usd_24h_change ?? 0);
        const ethChange = Number(eth.usd_24h_change ?? 0);

        /* 4. Update cards */
        const result = sampleQuotes.map((quote) => {
          if (quote.symbol === "BTC") {
            return {
              ...quote,
              change: btcChange,
              tone: btcChange >= 0 ? "up" : "down",
              candles: btcCandles.length ? btcCandles : quote.candles,
              live: true,
            };
          }

          if (quote.symbol === "ETH") {
            return {
              ...quote,
              change: ethChange,
              tone: ethChange >= 0 ? "up" : "down",
              candles: ethCandles.length ? ethCandles : quote.candles,
              live: true,
            };
          }

          /* AAPL and NVDA stay as sample cards. */
          return quote;
        });

        if (active) {
          setQuotes(result);
        }
      } catch (err) {
        console.warn("[LiveMarketLines] CoinGecko fetch failed:", err);

        if (active) {
          setQuotes(sampleQuotes);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    const timer = window.setInterval(load, 60_000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const upColor = "#26a69a";
  const downColor = "#ef5350";

  return (
    <section
      aria-label="Live market snapshot"
      style={{
        padding: compact ? "1.5rem 0" : "4rem 0",
        background: "#0e1117",
        color: "#e6e8eb",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.25rem",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8b98a9",
              margin: 0,
            }}
          >
            <Activity size={15} />
            Live market lines
          </p>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.15,
              margin: "0.5rem 0 0.75rem",
            }}
          >
            Markets move.
            <br />
            <em style={{ color: "#8b98a9" }}>Context matters.</em>
          </h2>

          <p
            style={{
              color: "#8b98a9",
              maxWidth: 640,
              margin: 0,
              fontSize: 14,
            }}
          >
            Live cryptocurrency market charts powered by CoinGecko.
          </p>
        </div>

        {/* Market Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {quotes.map((quote) => {
            const isUp = quote.tone === "up";
            const Arrow = isUp ? ArrowUpRight : ArrowDownRight;
            const changeColor = isUp ? upColor : downColor;

            return (
              <article
                key={quote.symbol}
                aria-label={`${quote.name} snapshot`}
                style={{
                  background: "#161b22",
                  border: "1px solid #232a33",
                  borderRadius: 12,
                  padding: "1rem 1rem 0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {/* Card header */}
                <header
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <small
                      style={{
                        display: "block",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#8b98a9",
                      }}
                    >
                      {quote.symbol}
                    </small>
                    <strong style={{ fontSize: 14 }}>{quote.name}</strong>
                  </div>

                  {quote.live && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        color: changeColor,
                        background: isUp
                          ? "rgba(38,166,154,0.12)"
                          : "rgba(239,83,80,0.12)",
                        padding: "3px 8px",
                        borderRadius: 6,
                      }}
                    >
                      <Arrow size={14} />
                      {isUp ? "+" : ""}
                      {quote.change.toFixed(2)}%
                    </span>
                  )}
                </header>

                {/* Chart */}
                <div
                  style={{
                    background: "#0e1117",
                    border: "1px solid #1c222b",
                    borderRadius: 8,
                    padding: "0.5rem 0.25rem 0.25rem",
                  }}
                >
                  <CandleChart candles={quote.candles} tone={quote.tone} />
                </div>
              </article>
            );
          })}
        </div>

        {/* Status */}
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: 12,
            color: "#6b7684",
            textAlign: "center",
          }}
        >
          {loading
            ? "Fetching live cryptocurrency data…"
            : "Live charts via CoinGecko."}
        </p>
      </div>
    </section>
  );
}