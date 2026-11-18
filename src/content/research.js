export const research = {
  id: 'research',
  nav: 'Research',
  eyebrow: 'Research',
  title: 'Two lenses: 43 survey responses and 6 conversations',
  body: [
    'The survey gave us breadth, and the interviews gave us stories. We added a live test inside each interview by asking people to find the warranty for a device they own on the spot.',
  ],
  contribution: [
    'Asking people to *show* retrieval rather than describe it exposed the gap between what they believed and what they could do.',
  ],
  // value + decimals drive the count-up; suffix is static text after the number
  stats: [
    { value: 43, label: 'survey respondents', detail: '95.3% aged 18–25 · 86% students' },
    { value: 6, label: 'interviews', detail: 'All university students' },
    { value: 5, suffix: ' of 6', label: 'failed the live retrieval test', tone: 'problem' },
  ],
  testTitle: 'The live retrieval test',
  test: [
    { who: 'A', outcome: 'Never looked at warranty info after purchase', ok: false },
    { who: 'B', outcome: 'Unsure if the laptop cover was 6 months or 1 year, and couldn’t find the card', ok: false },
    { who: 'C', outcome: 'Found the lookup site, then blocked (no serial number)', ok: false },
    { who: 'D', outcome: 'The online shop’s receipt didn’t mention a warranty', ok: false },
    { who: 'E', outcome: 'Found the phone warranty in iPhone Settings', ok: true },
    { who: 'F', outcome: 'Couldn’t remember which website to check', ok: false },
  ],
  testCaption: 'Only one of six could find their own warranty.',
}
