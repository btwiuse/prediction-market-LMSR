import type { NextApiRequest, NextApiResponse } from 'next';
import { getMarketInstance } from '@/lib/marketInstance';

type TradeResponse = {
  success: boolean;
  outcome?: string;
  shares?: number;
  cost?: number;
  revenue?: number;
  fund?: number;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TradeResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const market = getMarketInstance();
  const { outcome, shares, funds, trade_type } = req.body;

  try {
    const sharesNum = parseInt(shares);
    const fundsNum = parseFloat(funds);

    if (trade_type === 'buy') {
      const cost = market.buyShares(outcome, sharesNum, fundsNum);
      return res.status(200).json({
        success: true,
        outcome,
        shares: sharesNum,
        cost,
        fund: market.funds,
      });
    } else if (trade_type === 'sell') {
      const revenue = market.sellShares(outcome, sharesNum, fundsNum);
      return res.status(200).json({
        success: true,
        outcome,
        shares: sharesNum,
        revenue,
        fund: market.funds,
      });
    } else {
      return res.status(400).json({ success: false, error: 'Invalid trade type' });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    });
  }
}
