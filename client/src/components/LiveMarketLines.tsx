import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";

type Quote = {
  symbol: string;
  name: string;
  price: string;
  change: number;
  points: number[];
  tone: "up" | "down";
};

// Fallback stays as a last resort — but we now log when we fall back.
const fallback: Quote[] = [
  { symbol: "BTC", name: "Bitcoin", price: "$67,482.10", change: 2.84, points: [22,27,24,36,31,43,39,52,48,64,61,73], tone: "up" },
  { symbol: "AAPL", name: "Apple", price: "$227.16", change: -0.62, points: [70,63,68,56,60,48,52,44,49,38,41,35], tone: "down" },
  { symbol: "NVDA", name: "NVIDIA", price: "$131.28", change: 1.91, points: [28,35,31,44,40,49,46,62,55,69,65,80], tone: "up" },
  { symbol: "ETH", name: "Ethereum", price: "$3,482.77", change: -1.08, points: [68,73,62,66,54,58,49,55,42,46,34,39], tone: "down" },
];

function Line({ points, tone }: { points: number[]; tone: "up" | "down" }) {
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * 100},${100 - p}`)
    .join(" ");
  return (
    <svg className={`quote-line ${tone}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function LiveMarketLines({ compact = false }: { compact?: boolean }) {
  const [quotes, setQuotes] = useState(fallback);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        // CoinGecko simple/price — one call for BTC + ETH with 24h change.
        const cryptoRes = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
        );

        // Guard: non-200 (429 rate limit, 500, etc.)
        if (!cryptoRes.ok) {
          throw new Error(`CoinGecko returned ${cryptoRes.status}`);
        }

        const crypto = await cryptoRes.json();

        // Guard: schema validation — make sure the keys we expect are there.
        if (!crypto.bitcoin?.usd || !crypto.ethereum?.usd) {
          throw new Error("CoinGecko payload missing bitcoin/ethereum");
        }

        const btcChange = Number(crypto.bitcoin.usd_24h_change ?? 0);
        const ethChange = Number(crypto.ethereum.usd_24h_change ?? 0);

        const result = fallback.map((quote) => {
          if (quote.symbol === "BTC") {
            return {
              ...quote,
              price: `$${Number(crypto.bitcoin.usd).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: btcChange,
              tone: btcChange >= 0 ? ("up" as const) : ("down" as const),
            };
          }
          if (quote.symbol === "ETH") {
            return {
              ...quote,
              price: `$${Number(crypto.ethereum.usd).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: ethChange,
              tone: ethChange >= 0 ? ("up" as const) : ("down" as const),
            };
          }
          // AAPL / NVDA left as-is for now — see note below.
          return quote;
        });

        if (active) setQuotes(result);
      } catch (err) {
        // Don't swallow silently — log so you can see why it fell back.
        console.warn("[LiveMarketLines] live fetch failed:", err);
      }
    }

    load();
    const timer = window.setInterval(load, 60000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className={`live-market-section ${compact ? "live-market-compact" : "section-pad"}`}>
      <div className="container">
        {/* ... rest of your JSX unchanged ... */}
      </div>
    </section>
  );
}