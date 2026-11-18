export const insight = {
  id: 'insight',
  nav: 'Key insight',
  eyebrow: 'Key insight',
  title: 'A warranty can be lost long before anyone tries to make a claim.',
  intro: 'When something breaks, people often mentally pass through a sequence of questions.',
  gates: [
    { q: 'Does warranty come to mind?', value: 7, text: 'said it might have been covered, but never checked' },
    { q: 'Is it still covered?', value: 41.9, decimals: 1, suffix: '%', text: 'missed a claim due to expiry, and 39.5% didn’t know their dates' },
    { q: 'Can I find the proof?', value: 62.8, decimals: 1, suffix: '%', text: 'cite losing receipts, and this is the most common challenge' },
    { q: 'Is the problem covered?', value: 9, text: 'assumed it wasn’t without checking' },
    { q: 'Is it worth the effort?', value: 6, text: 'knew it was covered and still walked away' },
  ],
  figure: {
    src: 'images/mental-model.png',
    alt: 'Five-gate mental model. Something breaks, then five questions in sequence lead to making a claim: does warranty come to mind, is it still covered, can I find the proof, is the problem covered, is it worth the effort. Each gate has an exit where people drop out before a claim: 7 never checked; 41.9% missed a claim due to expiry; 62.8% cite losing receipts; 9 assumed it wasn’t covered; 6 knew it was covered and walked away.',
    caption: 'Each box is a question people face when something breaks. A “yes” moves them to the next gate, and the dashed arrow is where they drop out before ever claiming. Every exit is a different design problem.',
  },
  closing:
    'Of the 21 people who had never claimed, 15 had something break and let it go.',
}
