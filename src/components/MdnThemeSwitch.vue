<script setup lang="ts">
import { useColorMode, useToggle } from '@vueuse/core';

const [showThemeMenu, toggleThemeMenu] = useToggle(false);

const { store: theme } = useColorMode();
</script>

<template>
  <div class="relative">
    <button class="flex gap-1" @click="toggleThemeMenu()">
      <div
        class="inline-block"
        :class="{
          'i-mdi-circle-half-full': theme === 'auto',
          'i-mdi-white-balance-sunny': theme === 'light',
          'i-mdi-moon-waning-crescent': theme === 'dark',
        }"
      />
      <span>Theme</span>
    </button>
    <ul
      v-if="showThemeMenu"
      class="z-1 absolute w-40 rounded border border-gray-300 bg-gray-100 dark:bg-gray-700"
    >
      <li>
        <button
          class="flex w-full gap-1 p-2"
          @click="
            theme = 'auto';
            toggleThemeMenu(false);
          "
        >
          <div class="i-mdi-circle-half-full inline-block" />
          <span>OS Default</span>
        </button>
      </li>

      <li>
        <button
          class="flex w-full gap-1 p-2"
          @click="
            theme = 'light';
            toggleThemeMenu(false);
          "
        >
          <div class="i-mdi-white-balance-sunny inline-block" />
          <span>Light</span>
        </button>
      </li>

      <li>
        <button
          class="flex w-full gap-1 p-2"
          @click="
            theme = 'dark';
            toggleThemeMenu(false);
          "
        >
          <div class="i-mdi-moon-waning-crescent inline-block" />
          <span>Dark</span>
        </button>
      </li>
    </ul>
  </div>
</template>
