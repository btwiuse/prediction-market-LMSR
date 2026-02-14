# LSMR Prediction Market
This is a simple web application that demonstrates the use of Hanson's Logarithmic Market Scoring Rule (LMSR) for a prediction market. Users can make trades on predictions, betting on how likely an event is to occur. Each prediction is an individual market with a market maker system modeled on Robin Hanson's logarithmic market scoring rules.

## Some finance theory before we move ahead!

Prediction markets are a way for people to make bets on what they think will happen in the future, like a game. They use money or pretend money to buy shares that represent different outcomes of an event, like whether it will rain or not. The price of the shares changes depending on how many people believe that outcome will happen. After the event happens, the people who bought the right shares get paid.

*The Logarithmic Market Scoring Rule (LMSR) is a mathematical formula used in prediction markets to determine the prices of different outcomes or "securities" in the market.* The basic formula for LMSR is as follows:

**Price of a security** = exp(B * p - C) / (1 + exp(B * p - C))

Where:

- B is the market maker's "efficiency parameter"
- p is the probability that the security will be true
- C is a normalizing constant that ensures the prices of the securities sum to 1
The LMSR algorithm takes into account the probability of the event, as well as the number of shares of the security that have been purchased. By adjusting the value of B, the market maker can control the degree of "market efficiency" - that is, how quickly the prices of the securities respond to changes in demand.

The main advantage of LMSR is that it is a "market-making" algorithm, which means it automatically creates a market for any event, even if there's no market yet. LMSR is considered more robust than other market making algorithms, such as Vickrey-Clarke-Groves (VCG) or the Quadratic Voting algorithm.

## Tech Stack

This application has been ported to **Next.js** with the following technologies:
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **Bun** - Fast JavaScript runtime and package manager (compatible with npm)

## Prerequisites
- Node.js 18.x or higher (or Bun 1.0+)
- npm or Bun package manager

## Running the Application

### Using npm (recommended for compatibility)
1. Clone the repository to your local machine
2. Navigate to the cloned repository in your command line
3. Run `npm install` to install the required dependencies
4. Run `npm run dev` to start the development server
5. Open your web browser and navigate to http://localhost:3000/

### Using Bun
1. Clone the repository to your local machine
2. Navigate to the cloned repository in your command line
3. Install Bun if not already installed: `curl -fsSL https://bun.sh/install | bash`
4. Run `bun install` to install the required dependencies
5. Run `bun run dev` to start the development server
6. Open your web browser and navigate to http://localhost:3000/

## Building for Production
```bash
npm run build
npm start
```

Or with Bun:
```bash
bun run build
bun start
```

## Using the Application
1. Select the outcome you want to trade on from the dropdown menu
2. Enter the number of shares you want to trade
3. Select the trade type (buy or sell)
4. Enter the funds available for the trade
5. Click on the Submit button to make the trade
6. The result of the trade will be displayed on the screen

Note: This is a simple demonstration application and is not intended for production use.
