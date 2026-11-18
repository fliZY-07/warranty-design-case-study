export const contradiction = {
  id: 'contradiction',
  nav: 'Contradiction',
  eyebrow: 'The awkward finding',
  title: 'Everyone said claiming wasn’t worth it, but the data said claiming actually works.',
  intro:
    'Five of six interviewees called claiming not worth the effort. The survey agreed on effort, but revealed a different picture of what actually stopped people.',
  outcome: {
    title: 'Outcome of the 22 most recent claims',
    rows: [
      { value: 11, label: 'repaired free' },
      { value: 7, label: 'brand new replacement' },
      { value: 3, label: 'refund' },
      { value: 1, label: 'replacement with top-up' },
    ],
    highlight: { value: 0, label: 'walked away with nothing' },
  },
  cost: {
    title: 'The cost in time',
    rows: [
      { value: 16, of: 22, label: 'took more than a week' },
      { value: 3, label: 'resolved same day' },
      { value: 13, of: 22, label: 'hit at least one obstacle' },
    ],
    obstaclesLabel: 'Obstacles reported',
    obstacles: [
      { value: 7, label: 'process too long' },
      { value: 6, label: 'unhelpful service' },
      { value: 5, label: 'hidden fees' },
      { value: 5, label: 'inconvenient location' },
    ],
  },
  figure: {
    src: 'images/chart-claim-effort.png',
    alt: 'Quadrant chart placing interviewees’ items by item value (vertical) and effort to claim (horizontal). Claim readily: AirPod (coverage unclear). Claim reluctantly: laptop; phone (AppleCare bought); bicycle (tire claim refused); headphones (protection plan bought); G-Shock watch (expired by 2 months). The abandon zone: JBL earbuds (expired), mouse, keyboard. Rarely bother: coffee kettle.',
    caption: 'Interviewees’ items by value and effort to claim. Where effort outweighs the replacement cost, the warranty is dropped.',
  },
  body: [
    'Three of the five people with the most negative views had never actually made a claim. Their expectations were shaped more by what they thought the process would be like than by experience.',
    'So we weren’t fixing a broken system. **We were addressing the uncertainty and perceived hassle that kept people from using a system that largely worked.**',
  ],
  quote: { text: 'If it’s a small item, it’s easier to replace than to claim the warranty.', cite: 'Interviewee' },
}
