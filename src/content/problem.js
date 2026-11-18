export const problem = {
  id: 'problem',
  nav: 'Problem',
  eyebrow: 'The problem',
  title: 'A warranty is only useful when something goes wrong.',
  body: [
    'Warranties sit unused for years, then matter for one afternoon. We started from a hypothesis: people lose the proof of purchase long before they need it, and pay for repairs or replacement they were already covered for.',
    'Existing tools don’t close that gap. Warrantly makes you type in every product and caps the free tier at five warranties, and Apple’s lookup is effortless, but only for Apple products.',
  ],
  flowLabel: 'The pattern we designed against',
  // kind: 'step' | 'gap' (the long wait) | 'fail' (where it goes wrong)
  flow: [
    { text: 'Purchase', kind: 'step' },
    { text: 'Receives receipt', kind: 'step' },
    { text: 'Long time gap', kind: 'gap' },
    { text: 'Info lost or forgotten', kind: 'fail' },
    { text: 'Item breaks', kind: 'fail' },
    { text: 'Cannot claim', kind: 'fail' },
  ],
  audience: {
    label: 'Who we designed for',
    title: 'Young adults aged 18–25',
    text: 'Early in their financial journey, but already making purchases worth protecting.',
  },
}
