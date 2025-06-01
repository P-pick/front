import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
      },
      maxWidth: {
        mobile: '375px',
      },
    },
  },
  plugins: [],
};

export default config;
