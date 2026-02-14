import type { NextApiRequest, NextApiResponse } from 'next';
import { getMarketInstance } from '@/lib/marketInstance';

type MarketData = {
  outcomes: string[];
  funds: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MarketData>
) {
  const market = getMarketInstance();
  
  res.status(200).json({
    outcomes: market.getOutcomes(),
    funds: market.funds,
  });
}
