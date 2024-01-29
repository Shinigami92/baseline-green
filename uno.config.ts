import presetIcons from '@unocss/preset-icons';
import type { PresetUnoOptions, Theme } from '@unocss/preset-uno';
import { presetUno } from '@unocss/preset-uno';
import type { Preset } from 'unocss';
import { defineConfig } from 'unocss';

type PresetMdnOptions = PresetUnoOptions;

function presetMdn(options: PresetMdnOptions = {}): Preset<Theme> {
  const uno = presetUno(options);

  // see: https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/_theme/misc.ts#L4
  const breakpoints: Theme['breakpoints'] = {
    xs: '425px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1440px',
  };

  const colors: Theme['colors'] = {
    blue: {
      400: '#8cb4ff',
      600: '#0069c2',
    },
    gray: {
      50: '#ffffff',
      100: '#f9f9fb',
      200: '#e2e2e2',
      300: '#cdcdcd',
      400: '#b3b3b3',
      500: '#858585',
      600: '#4e4e4e',
      700: '#313131',
      800: '#1a1a1a',
      900: '#1b1b1b',
      950: '#000000',
      DEFAULT: '#858585',
    },
    green: {
      300: '#00d0aa',
      400: '#00d061',
      600: '#00b755',
      700: '#007936',
      DEFAULT: '#00d061',
    },
    purple: {
      400: '#ffadff',
      600: '#551a8b',
    },
  };

  // assign default color, and color shortcuts
  for (const color of Object.values(colors)) {
    if (typeof color !== 'string') {
      // @ts-expect-error: color[400] should be always defined
      color.DEFAULT = color.DEFAULT || color[400];
      for (const key of Object.keys(color)) {
        const short = +key / 100;
        if (short === Math.round(short)) {
          color[short] = color[key];
        }
      }
    }
  }

  return {
    ...uno,
    name: 'preset-mdn',
    theme: {
      ...uno.theme,
      breakpoints: {
        ...uno.theme?.breakpoints,
        ...breakpoints,
      },
      colors: {
        ...uno.theme?.colors,
        ...colors,
      },
    },
  } as Preset<Theme>;
}

export default defineConfig({
  presets: [
    presetMdn(),
    presetIcons({
      extraProperties: {
        'font-size': '1.5rem',
      },
    }),
  ],
});
