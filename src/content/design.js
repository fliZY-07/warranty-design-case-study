const shot = (file, alt, caption) => ({ src: `images/${file}`, alt, caption })

export const design = {
  id: 'design',
  nav: 'Design',
  eyebrow: 'The design',
  title: 'The moments across the warranty journey',
  intro: 'The final design was shaped by usability testing. It tackles three main flows in the warranty claiming journey.',
  flowFigure: {
    src: 'images/userflow.png',
    alt: 'User flow in three lanes. Capture, at purchase: purchase, merchant issues pass, added to Wallet in one tap. Months or years later, Retrieve: a reminder fires or the item breaks; find it by browse, search or the Assistant; the warranty pass states the coverage. If something is wrong, Claim: a pre-filled new claim with proof attached, six tracked stages, archived.',
  },
  bands: [
    {
      name: 'Capture',
      steps: ['Purchase', 'Merchant issues pass', 'Added to Wallet in one tap'],
      figures: [
        shot(
          'wallet-pass.png',
          'Apple Wallet main screen: a payment card above a Warranties section showing the Sony WH-1000XM5 pass, marked Active, with serial number, date of purchase and expiry date.',
          'The pass sits in Wallet, beside cards people already open.',
        ),
      ],
    },
    {
      name: 'Retrieve',
      steps: ['A reminder fires or the item breaks', 'Find it by browse, search or chatbot', 'Coverage stated on the pass'],
      // autoplay carousel, in the order of the routes: browse → search → ask → arrive at the pass
      carousel: [
        {
          step: 'Browse',
          src: 'images/warranties-list.png',
          alt: 'Warranties screen with a sort control, All, Claims and Archives tabs and a search icon. Items are tagged Electronics, Vehicles or Home Appliances; the Cornell kettle carries an Expiring Soon badge.',
          title: 'Browse by tab and tag',
          caption: 'All / Claims / Archives | “Expiring soon” surfaces itself.',
        },
        {
          step: 'Search',
          src: 'images/search-sort.png',
          alt: 'Search open on the Warranties screen, listing recent searches as product cards with their tags.',
          title: 'Search by recognition',
          caption: 'Recent items appear as cards before anything is typed.',
        },
        {
          step: 'Ask',
          src: 'images/chatbot-1.png',
          alt: 'Warranty Assistant start screen: “How can I help?” with suggested questions to find a warranty or receipt, check what’s covered, make a claim, or track expiry dates.',
          title: 'Or ask the Assistant',
          caption: 'Suggested questions cover finding, coverage, claims and expiry.',
        },
        {
          step: 'Ask',
          src: 'images/chatbot-2.png',
          alt: 'Warranty Assistant with the keyboard open, typing a question about what the headphone warranty covers.',
          title: 'In your own words',
          caption: '“What does my headphone warranty cover?”',
        },
        {
          step: 'Ask',
          src: 'images/chatbot-3.png',
          alt: 'Warranty Assistant reply: it finds two headphones, the user picks the Sony, and it states that parts and labour are covered until 23 November 2027, with serial number, order ID, platform and a View warranty button.',
          title: 'A direct answer',
          caption: 'It checks which item you mean, states the coverage, and links to the pass.',
        },
        {
          step: 'Arrive',
          src: 'images/warranty-detail.png',
          alt: 'Warranty pass for the Sony WH-1000XM5 showing serial number, purchase and expiry dates, order ID, platform, a Terms & conditions link for coverage and a barcode, with Start a claim and View proof of purchase buttons.',
          title: 'Every route ends on the pass',
          caption: 'Revised after testing: coverage as a distinct link, proof of purchase as its own button.',
        },
      ],
    },
    {
      name: 'Claim',
      steps: ['Form pre-filled with proof attached', 'Six tracked stages', 'Archived'],
      // autoplay carousel: the form, then the claim moving through its six tracked stages
      carousel: [
        {
          step: 'Submit',
          src: 'images/claim-form.png',
          alt: 'New Claim form for the Sony WH-1000XM5: proof of purchase attached automatically, what went wrong, one photo attached, resolution wanted set to Repair, and a contact number. A note says the claim will be sent to Sony Services via Shopee.',
          title: 'Proof attached automatically',
          caption: 'Users only need to describe the problem and attach a photo.',
        },
        {
          step: 'Stage 1 of 6',
          src: 'images/claim-progress-1.png',
          alt: 'Claim status: Claim submitted, claim #DE1234, sent to Sony Service Center Singapore. The timeline shows Submitted on 27 Oct, with five stages still to come.',
          title: 'Claim submitted',
          caption: 'The whole timeline is visible from the start, so the user knows what comes next.',
        },
        {
          step: 'Stage 2 of 6',
          src: 'images/claim-progress-2.png',
          alt: 'Claim status: Under review. The timeline shows Submitted done and Under review in progress.',
          title: 'Under review',
          caption: 'Nothing for the user to do yet, and the screen says so.',
        },
        {
          step: 'Stage 3 of 6',
          src: 'images/claim-progress-3.png',
          alt: 'Claim status: Action needed, Bring for repair. Under review is marked Approved under warranty. Buttons: Get directions and Message service.',
          title: 'Action needed: bring for repair',
          caption: 'Once approved under warranty, directions and a message button are one tap away.',
        },
        {
          step: 'Stage 4 of 6',
          src: 'images/claim-progress-4.png',
          alt: 'Claim status: Repair in progress, with a Message service button.',
          title: 'Repair in progress',
          caption: 'Progress updates arrive without the user having to chase.',
        },
        {
          step: 'Stage 5 of 6',
          src: 'images/claim-progress-5.png',
          alt: 'Claim status: Action needed, Ready for collection at the service centre. Buttons: Get directions and Message service.',
          title: 'Action needed: ready for collection',
          caption: 'The second and last time the user is asked to act.',
        },
        {
          step: 'Stage 6 of 6',
          src: 'images/claim-progress-6.png',
          alt: 'Claim Completed: the Sony WH-1000XM5 has been repaired and collected, 4 Nov 2026, claim #DE1234. All six stages are ticked. Button: Back to Warranty Page.',
          title: 'Claim completed',
          caption: 'Repaired and collected. Every stage ticked, and back to the warranty page.',
        },
      ],
    },
  ],
  ia: {
    title: 'Where everything lives',
    figure: {
      src: 'images/ia-map.png',
      alt: 'Information architecture site map, three levels deep, with Search and the Assistant drawn as utility navigation.',
      caption: 'Search and the Assistant drawn as routes, not sections.',
    },
    // table: {
    //   caption: 'What came from iOS, and what I designed on top.',
    //   head: ['Component', 'Inherited from iOS', 'What I designed', 'Why'],
    //   rows: [
    //     ['Organisation', 'Wallet’s pass stack', 'One pass per item; All / Claims / Archives', '5–10 items, not 500'],
    //     ['Labelling', 'Pass field layout', '“Covered until”; status chips; user tags', 'States the answer, not the inputs'],
    //     ['Navigation', 'Wallet, notifications, Maps, WhatsApp', 'Two levels: list → item → claim', 'Nothing to re-learn after months away'],
    //     ['Search', 'Minimal native search', 'Recognition cues; sort by tag, name, date, price', 'Recognition over recall'],
    //   ],
    // },
  },
}
