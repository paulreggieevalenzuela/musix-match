/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

// TODO: get back to setting this colorSafeList so dynamic colors can be used inside arrays
const tailwindColors = require('./node_modules/tailwindcss/colors');
const colorSafeList: string[] = [];
// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = [
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray',
];

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue;
  }

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const pallette = tailwindColors[colorName];

  if (typeof pallette === 'object') {
    shades.forEach((shade) => {
      if (shade in pallette) {
        colorSafeList.push(`text-${colorName}-${shade}`);
        colorSafeList.push(`bg-${colorName}-${shade}`);
      }
    });
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Neue Haas Unica Pro', ...fontFamily.sans],
        secondary: ['Neue Haas Unica Pro', ...fontFamily.sans],
        body: ['Neue Haas Unica Pro', ...fontFamily.sans],
        heading: ['Neue Haas Unica Pro', ...fontFamily.sans],
        serif: ['FreightText Pro', ...fontFamily.serif],
      },
      fontWeight: {
        light: '350',
      },
      fontSize: {
        xxs: '11px',
      },
      colors: {
        black: {
          DEFAULT: '#111111',
        },
        blue: {
          primary: '#327194',
          50: '#c6deeb',
          100: '#a6bdce',
          200: '#91aec3',
          300: '#7a9eb7',
          400: '#648fab',
          500: '#4c809f',
          600: '#327194',
          700: '#027AFF',
          800: '#0069E0',
          900: '#005AC2',
          lightest: '#d9e9f2',
          DEFAULT: '#327194',
          darkest: '#275872',
        },
        maroon: {
          50: '#FCF8FA',
          100: '#F5E5EC',
          200: '#E8C0D0',
          300: '#D892AF',
          400: '#C96991',
          500: '#BD4778',
          600: '#B02760',
          700: '#A8245B',
          800: '#A31F56',
          900: '#981B4F',
          lightest: '#FCF8FA',
          DEFAULT: '#A8245B',
          darkest: '#8A1445',
        },
        gray: {
          50: '#F6F6F8',
          100: '#EDEDF2',
          200: '#D0D0DD',
          300: '#B0B0C4',
          400: '#8F8FAE',
          500: '#78789B',
          600: '#60608A',
          700: '#545478',
          800: '#454563',
          900: '#36364E',
          lightest: '#F6F6F8',
          DEFAULT: '#545478',
          darkest: '#111111',
        },
        yellow: {
          50: '#FFFAF0',
          100: '#FFF5E0',
          200: '#FFE5B2',
          300: '#FFD480',
          400: '#FFC34D',
          500: '#FFB624',
          600: '#FFAA00',
          700: '#FAA700',
          800: '#F5A300',
          900: '#F0A000',
          lightest: '#FFFAF0',
          DEFAULT: '#FAA700',
          darkest: '#E59900',
        },
        green: {
          50: '#F4FAF8',
          100: '#DFF1EA',
          200: '#B3DFCE',
          300: '#80CBAD',
          400: '#4EB78D',
          500: '#26A673',
          600: '#009459',
          700: '#008A53',
          800: '#007A49',
          900: '#006B40',
          lightest: '#F4FAF8',
          DEFAULT: '#008A53',
          darkest: '#004D2E',
        },
        red: {
          50: '#FFF5F5',
          100: '#FFEBEB',
          200: '#FFCCCC',
          300: '#EF9A9A',
          400: '#E57171',
          500: '#EF5252',
          600: '#F43434',
          700: '#E53434',
          800: '#D33131',
          900: '#C72929',
          lightest: '#F4FAF8',
          DEFAULT: '#F43434',
          darkest: '#B51C1C',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#F8F8FC',
          200: '#F1F1F9',
          300: '#A4A4A4',
          400: '#707070',
        },
        dark: {
          a: '#0B4242',
          b: '#112249',
          c: '#1E0C2C',
        },
        nav: {
          hover: 'rgba(255, 255, 255, 0.08)',
          selected: 'rgba(255, 255, 255, 0.16)',
          button: 'rgba(0, 0, 0, 0.06)',
          menu: 'rgb(50, 113, 148, 0.1)',
        },
        facebook: '#3C5A96',
        linkedin: '#1178B3',
        mailchimp: '#2C9AB7',
        microsoft: '#F35426',
        twitter: '#2AA3EF',
        pinterest: '#BB0F23',
        paypal: '#053385',
        reddit: '#FC471E',
        google: '#E8453C',
        dropbox: '#1581E2',
        rss: '#F0652F',
        salesforce: '#2399BF',
        dribble: '#E84F89',
        instagram: '#713DBB',
        slack: '#DE1D64',
        youtube: '#FC0D1B',
      },
      dropShadow: {
        default: '0 2px 2px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(180deg, rgba(2, 122, 255, 0.08) 0%, rgba(2, 122, 255, 0.02) 100%), url(/svg/gradient-square.svg)',
        'gradient-secondary':
          ' linear-gradient(180deg, rgba(168, 36, 93, 0.08) 0%, rgba(168, 36, 93, 0.02) 100%), url(/svg/gradient-square.svg)',
        'gradient-gray':
          'linear-gradient(180deg, rgba(107, 107, 128, 0.08) 0%, rgba(107, 107, 128, 0.02) 100%), url(/svg/gradient-square.svg)',
      },
      boxShadow: {
        center: '0px 0px 15px 0px rgba(0,0,0,0.15)',
        medium: '0px 0px 10px 2px rgba(0,0,0,0.16)',
        blue: '0px 0px 0px 4px rgba(2, 122, 255, 0.2)',
        '00': '0px 2px 8px rgba(0, 0, 0, 0.12)',
        '01': '0px 4px 12px rgba(0, 0, 0, 0.16)',
        '02': '0px 8px 16px rgba(0, 0, 0, 0.12)',
        '03': '0px 16px 24px rgba(0, 0, 0, 0.12)',
        '04': '0px 0px 0px 4px rgba(2, 122, 255, 0.2)',
        '05': '0px 0px 0px 4px rgba(229, 52, 81, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export {};
