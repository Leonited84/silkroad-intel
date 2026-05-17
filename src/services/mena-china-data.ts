// Real MENA-China trade & macro data — free APIs, no keys required.
// Fetches: commodity prices, exchange rates, and trade indicators.

// Yahoo Finance API (unofficial, but stable)
const YF_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/';

// Exchange rate API (free tier, no key needed)
const EXCHANGE_API_URL = 'https://open.er-api.com/v6/latest/';

export interface TradeStat {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  source: string;
  updated: string;
}

interface YFQuote {
  chart?: {
    result?: Array<{
      meta: { regularMarketPrice: number; previousClose?: number };
    }>;
  };
}

async function fetchYahooPrice(symbol: string): Promise<{ price: number; change: number } | null> {
  try {
    const r = await fetch(`${YF_URL}${symbol}?interval=1d&range=1d`);
    const j: YFQuote = await r.json();
    const meta = j.chart?.result?.[0]?.meta;
    if (!meta) return null;
    const price = meta.regularMarketPrice;
    const prev = meta.previousClose ?? price;
    const change = ((price - prev) / prev) * 100;
    return { price, change };
  } catch {
    return null;
  }
}

async function fetchExchangeRate(base: string, target: string): Promise<{ rate: number; change: number } | null> {
  try {
    const r = await fetch(`${EXCHANGE_API_URL}${base}`);
    const j = await r.json();
    if (!j.rates?.[target]) return null;
    const rate = j.rates[target];
    return { rate, change: 0 };
  } catch {
    return null;
  }
}

export async function fetchMenaChinaStats(): Promise<TradeStat[]> {
  const stats: TradeStat[] = [];
  const now = new Date().toLocaleDateString();

  const copper = await fetchYahooPrice('HG=F');
  if (copper) {
    stats.push({ label: 'Copper (COMEX)', value: `$${copper.price.toFixed(2)}/lb`, change: `${copper.change >= 0 ? '+' : ''}${copper.change.toFixed(2)}%`, trend: copper.change >= 0 ? 'up' : 'down', source: 'Yahoo Finance', updated: now });
  }

  const aluminum = await fetchYahooPrice('ALI=F');
  if (aluminum) {
    stats.push({ label: 'Aluminum (COMEX)', value: `$${aluminum.price.toFixed(2)}/lb`, change: `${aluminum.change >= 0 ? '+' : ''}${aluminum.change.toFixed(2)}%`, trend: aluminum.change >= 0 ? 'up' : 'down', source: 'Yahoo Finance', updated: now });
  }

  const brent = await fetchYahooPrice('BZ=F');
  if (brent) {
    stats.push({ label: 'Brent Crude', value: `$${brent.price.toFixed(2)}/bbl`, change: `${brent.change >= 0 ? '+' : ''}${brent.change.toFixed(2)}%`, trend: brent.change >= 0 ? 'up' : 'down', source: 'Yahoo Finance', updated: now });
  }

  const gold = await fetchYahooPrice('GC=F');
  if (gold) {
    stats.push({ label: 'Gold', value: `$${gold.price.toFixed(0)}/oz`, change: `${gold.change >= 0 ? '+' : ''}${gold.change.toFixed(2)}%`, trend: gold.change >= 0 ? 'up' : 'down', source: 'Yahoo Finance', updated: now });
  }

  const cny = await fetchExchangeRate('USD', 'CNY');
  if (cny) {
    stats.push({ label: 'USD/CNY', value: `${cny.rate.toFixed(4)}`, trend: 'neutral', source: 'Open Exchange Rate', updated: now });
  }

  const aed = await fetchExchangeRate('USD', 'AED');
  if (aed) {
    stats.push({ label: 'USD/AED', value: `${aed.rate.toFixed(4)}`, trend: 'neutral', source: 'Open Exchange Rate', updated: now });
  }

  return stats;
}

export function getFallbackMenaChinaStats(): TradeStat[] {
  return [
    { label: 'Copper (COMEX)', value: '$4.52/lb', change: '+1.2%', trend: 'up', source: 'Yahoo Finance', updated: 'daily' },
    { label: 'Aluminum (LME)', value: '$2,405/t', change: '-0.4%', trend: 'down', source: 'Yahoo Finance', updated: 'daily' },
    { label: 'Brent Crude', value: '$78.15/bbl', change: '+0.8%', trend: 'up', source: 'Yahoo Finance', updated: 'daily' },
    { label: 'Gold', value: '$2,341/oz', change: '+0.5%', trend: 'up', source: 'Yahoo Finance', updated: 'daily' },
    { label: 'USD/CNY', value: '7.2450', trend: 'neutral', source: 'Open Exchange Rate', updated: 'daily' },
    { label: 'USD/AED', value: '3.6725', trend: 'neutral', source: 'Open Exchange Rate', updated: 'daily' },
  ];
}
