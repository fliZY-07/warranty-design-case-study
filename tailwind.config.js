/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // One type scale, five sizes. `fontSize` is replaced (not extended) so no sixth size can creep in.
    fontSize: {
      sm: ['0.9375rem', { lineHeight: '1.5' }], // 15px — eyebrows, captions, meta, tables
      base: ['clamp(1.125rem, 1.08rem + 0.15vw, 1.1875rem)', { lineHeight: '1.65' }], // 18–19px body
      lg: ['clamp(1.3125rem, 1.15rem + 0.55vw, 1.625rem)', { lineHeight: '1.4' }], // h3, standfirst
      xl: ['clamp(1.875rem, 1.35rem + 2vw, 3rem)', { lineHeight: '1.12' }], // h2, pull-quotes
      display: ['clamp(2.625rem, 1.6rem + 4.4vw, 5.25rem)', { lineHeight: '1.02' }], // h1, figures
    },
    extend: {
      colors: {
        // same values as the :root tokens in index.css (hex here so /opacity modifiers work)
        ink: '#16242B',
        paper: '#FBFAF7',
        surface: '#FFFFFF',
        line: '#E2E6E8',
        muted: '#5A6872',
        deep: '#264653',
        teal: '#2A9D8F',
        'teal-ink': '#1E7A6E',
        orange: '#E76F51',
        rust: '#BC4B2A',
        mist: '#C5CED1',
        // section-scoped tokens: these are what eases between light and dark sections
        'sec-bg': 'var(--sec-bg)',
        'sec-fg': 'var(--sec-fg)',
        'sec-muted': 'var(--sec-muted)',
        'sec-line': 'var(--sec-line)',
        'sec-label': 'var(--sec-label)',
        'sec-card': 'var(--sec-card)',
      },
      fontFamily: {
        display: ['"Open Sauce One"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: { measure: '68ch', page: '1200px' },
    },
  },
  plugins: [],
}
