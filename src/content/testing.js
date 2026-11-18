export const testing = {
  id: 'testing',
  nav: 'Testing',
  eyebrow: 'Usability testing',
  title: 'The main flow worked, the details did not',
  intro: 'We tested the first prototype with 4 participants across four tasks. The core warranty flow was easy to follow, but the supporting task exposed gaps we had not anticipated.',
  // result: 'pass' | 'fail' | 'friction'
  tasks: [
    { n: 1, task: 'Submit a claim for the Sony headphones', result: 'pass', resultLabel: 'Completed', text: 'Everyone completed it without issue.' },
    { n: 2, task: 'Find the coverage terms', result: 'pass', resultLabel: 'Completed', text: 'Most eventually reached the right screen, but coverage information did not stand out from the other details and the chatbot icon was not immediately recognisable.' },
    { n: 3, task: 'Filter to electronics', result: 'fail', resultLabel: 'Mostly failed', text: 'Most tried Sort By, Claims and Archives, and had to be prompted to the search bar where tags lived.' },
    { n: 4, task: 'Find the original receipt', result: 'pass', resultLabel: 'Completed', text: 'Everyone succeeded, but some expected it to expand in place, not open a document.' },
  ],
  closing:
    'Both failures were the same error: findable by logic, not by habit.',
}
