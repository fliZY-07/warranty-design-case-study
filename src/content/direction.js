export const direction = {
  id: 'direction',
  nav: 'Direction',
  eyebrow: 'From insight to direction',
  title: 'Four directions evaluated against what users actually cared about',
  intro:
    'We analysed 43 open-text answers to the question “what would stop you using a free warranty app?” The five recurring barriers emerged and became our scoring criteria.',
  barriersLabel: 'What would stop people from using a free warranty app? (43 responses)',
  barriers: [
    { label: 'Too much effort / complicated UI / manual input', count: 12, pct: 28 },
    { label: 'Another app to manage, or existing alternatives', count: 7, pct: 16 },
    { label: 'Cost or advertisements', count: 6, pct: 14 },
    { label: 'Low perceived need', count: 4, pct: 9 },
    { label: 'Would forget it exists', count: 3, pct: 7 },
  ],
  table: {
    columns: ['Standalone app', 'Shopee integration', 'Gmail extension', 'Apple Wallet'],
    winner: 3,
    rows: [
      { criterion: 'Too much effort', cells: ['Poor unless highly automated', 'Excellent', 'Good', 'Good'] },
      { criterion: 'Don’t want another app', cells: ['Poor', 'Excellent for Shopee users', 'Excellent for Gmail users', 'Good for Apple users'] },
      { criterion: 'Cost or ads', cells: ['Depends on business model', 'Depends on Shopee', 'Depends on implementation', 'Potentially free'] },
      { criterion: 'Low perceived value', cells: ['Poor', 'Good, tied to a purchase', 'Moderate', 'Moderate'] },
      { criterion: 'Would forget it exists', cells: ['Poor', 'Good, within shopping history', 'Moderate unless reminders', 'Good if easy to access'] },
    ],
  },
  body: [
    'A standalone app was the obvious starting point, but it performed worst against the concern users raised most often. Shopee only covered purchases made on one platform, while a Gmail extension meant scanning an entire inbox just to find receipts that weren’t always there.',
  ],
  decision: [
    '**Apple Wallet stood out because the merchant could issue the pass directly for every purchase using it.** With just a single tap "Add to wallet", warranty information will be stored without manual data entry.',
  ],
  caveat: {
    label: 'Unvalidated assumption',
    text: 'The design depends on merchants issuing digital warranty passes for every single purchase. This project only focuses on the buyer’s experience.',
  },
}
