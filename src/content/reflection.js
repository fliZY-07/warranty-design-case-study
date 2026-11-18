export const reflection = {
  id: 'reflection',
  nav: 'Reflection',
  eyebrow: 'My reflection',
  title: 'What I learned',
  items: [
    {
      title: 'What people say they want isn’t always what they do',
      text: '18 people said a dedicated app would be most useful, but 15 of them were not tracking their warranties at all. This taught me not to take stated preference at face value. Treat it as a starting point for investigation, not the solution to build.',
      figure: {
        src: 'images/chart-want-vs-do.png',
        alt: 'Want vs do. Of the 18 who said a dedicated warranty app would be most useful, 15 currently track nothing and 7 would have recorded zero purchases in the past 12 months. Across all 43 respondents, purchases with a warranty they would have recorded in the past 12 months: 0 items, 17 (39.5%); 1–2 items, 15 (34.9%); 3–5 items, 9 (20.9%); 6 or more, 2 (4.7%). 74% would have recorded 2 items or fewer.',
        caption: 'Source: survey data from 43 respondents.',
      },
    },
    {
      title: 'We made claiming easier, not faster',
      text: 'The time it takes to process a claim is largely in the merchant’s hands. Thus, we focus on simplifying the information gathering and retrieval workflow that can make a difference. From there, I learned to be clearer about what design can improve and where is the limitation.',
    },
    {
      title: 'Some solutions that work theoretically not necessarily work in real life',
      text: 'Our concept still relies on merchants issuing digital warranty pass for every purchase using Apple Wallet. In real world settings, this will be hard to be integrated as it requires collaboration between Apple and merchants.',
    },
    {
      title: 'A good warranty tracking flow does not guarantee a successful claim',
      text: 'One finding that stood out to me was that 12 of the 22 people who had made a claim had been rejected at least once, and the most common reason turns out to be the user\'s fault. This problem was not tackled in this project but can be an interesting research direction moving forward.',
    },
  ],
}
