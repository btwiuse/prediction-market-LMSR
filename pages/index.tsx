import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';

type MarketData = {
  outcomes: string[];
  funds: number;
};

type TradeResult = {
  success: boolean;
  outcome: string;
  shares: number;
  cost?: number;
  revenue?: number;
  fund: number;
};

export default function Home() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [outcome, setOutcome] = useState('');
  const [shares, setShares] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [funds, setFunds] = useState('');
  const [result, setResult] = useState<TradeResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await fetch('/api/market');
      const data = await response.json();
      setMarketData(data);
      if (data.outcomes.length > 0) {
        setOutcome(data.outcomes[0]);
      }
    } catch (err) {
      setError('Failed to fetch market data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          outcome,
          shares,
          funds,
          trade_type: tradeType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        await fetchMarketData();
      } else {
        setError(data.error || 'Trade failed');
      }
    } catch (err) {
      setError('Failed to execute trade');
    }
  };

  return (
    <>
      <Head>
        <title>Prediction Market</title>
        <meta name="description" content="LMSR Prediction Market" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1>Prediction Markets</h1>
        {marketData && (
          <>
            <h3>Total Market Fund: {marketData.funds.toFixed(2)}</h3>
            <p>(reload for current value)</p>
          </>
        )}
        <h3>Market Maker Fee: 0.01 Euros</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="outcome">Outcome:</label>
            <select
              id="outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            >
              {marketData?.outcomes.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="shares">Shares:</label>
            <input
              type="number"
              id="shares"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="trade_type">Trade Type:</label>
            <select
              id="trade_type"
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value)}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="funds">Funds:</label>
            <input
              type="number"
              id="funds"
              value={funds}
              onChange={(e) => setFunds(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}

        {result && (
          <div className={styles.result}>
            <h2>{tradeType === 'buy' ? 'Buy Shares' : 'Sell Shares'}</h2>
            <p>Outcome: {result.outcome}</p>
            <p>Shares: {result.shares}</p>
            {result.cost !== undefined && <p>Cost: {result.cost.toFixed(2)}</p>}
            {result.revenue !== undefined && <p>Revenue: {result.revenue.toFixed(2)}</p>}
            <p>Total Market Fund: {result.fund.toFixed(2)}</p>
          </div>
        )}
      </main>
    </>
  );
}
