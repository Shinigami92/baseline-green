import presetIcons from '@unocss/preset-icons';
import { presetUno } from '@unocss/preset-uno';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'font-size': '1.5rem',
      },
    }),
  ],
});
