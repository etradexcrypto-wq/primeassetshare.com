import { useEffect } from "react";

export default function TradingViewMarket() {
  useEffect(() => {
    // Load the new web-component script once
    const SCRIPT_ID = "tv-market-overview-script";
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "module";
      script.src = "https://widgets.tradingview-widget.com/w/en/tv-market-overview.js";
      document.head.appendChild(script);
    }
  }, []);

  const symbolSectors = JSON.stringify([
    {
      sectionName: "Indices",
      symbols: ["FOREXCOM:SPXUSD", "FOREXCOM:NSXUSD", "FOREXCOM:DJI", "FOREXCOM:UKXGBP"],
    },
    {
      sectionName: "Stocks",
      symbols: ["NASDAQ:AAPL", "NASDAQ:ADBE", "NASDAQ:NVDA", "NASDAQ:TSLA"],
    },
    {
      sectionName: "Crypto",
      symbols: ["BITSTAMP:BTCUSD", "BITSTAMP:ETHUSD", "CRYPTO:XRPUSD"],
    },
  ]);

  return (
    <div
      className="tradingview-hero-layer"
      aria-label="TradingView market overview"
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <tv-market-overview
        symbol-sectors={symbolSectors}
        transparent=""
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />
    </div>
  );
}