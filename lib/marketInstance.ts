import { PredictionMarket } from './predictionMarket';

let marketInstance: PredictionMarket | null = null;

export function getMarketInstance(): PredictionMarket {
  if (!marketInstance) {
    marketInstance = new PredictionMarket(1000, 0.01);
    marketInstance.createMarket('Rain tomorrow');
    marketInstance.createMarket('Trump will be re-elected');
  }
  return marketInstance;
}
