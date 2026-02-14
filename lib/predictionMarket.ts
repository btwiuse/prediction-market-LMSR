export interface Market {
  outcome: string;
  shares: number;
  price: number;
}

export class PredictionMarket {
  funds: number;
  marketMakerFee: number;
  outcomes: Record<string, Market>;

  constructor(initialFunds: number, marketMakerFee: number) {
    this.funds = initialFunds;
    this.marketMakerFee = marketMakerFee;
    this.outcomes = {};
  }

  createMarket(outcome: string): void {
    this.outcomes[outcome] = {
      outcome,
      shares: 0,
      price: 0,
    };
  }

  getMarket(outcome: string): Market {
    return this.outcomes[outcome];
  }

  buyShares(outcome: string, shares: number, userFunds: number): number {
    const market = this.getMarket(outcome);
    const price = this.calculateSharePrice(shares, market.shares);
    const cost = price * shares;
    
    if (cost > userFunds) {
      throw new Error('Not enough funds');
    }
    
    market.shares += shares;
    market.price = price;
    this.funds += cost;
    
    return cost;
  }

  sellShares(outcome: string, shares: number, userFunds: number): number {
    const market = this.getMarket(outcome);
    
    if (shares > market.shares) {
      throw new Error('Not enough shares');
    }
    
    const price = this.calculateSharePrice(shares, market.shares - shares);
    const revenue = price * shares;
    
    market.shares -= shares;
    market.price = price;
    this.funds -= revenue;
    
    return revenue;
  }

  calculateSharePrice(shares: number, currentShares: number): number {
    return (
      this.calculateMarketPrice(currentShares + shares) -
      this.calculateMarketPrice(currentShares)
    );
  }

  calculateMarketPrice(shares: number): number {
    return (
      this.funds * Math.log(1 + (shares * this.marketMakerFee) / this.funds)
    );
  }

  getOutcomes(): string[] {
    return Object.keys(this.outcomes);
  }
}
