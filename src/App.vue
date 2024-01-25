<script setup lang="ts">
import type { Ref } from 'vue';
import { capitalCase } from 'change-case';
import { onMounted, ref } from 'vue';

interface Definition {
  name: string;
  spec: string | string[];
  status?: {
    baseline: false | 'low' | 'high';
    baseline_low_date?: string;
    support: {
      chrome?: string;
      chrome_android?: string;
      edge?: string;
      firefox?: string;
      firefox_android?: string;
      safari?: string;
      safari_ios?: string;
    };
  };
  caniuse?: string | string[];
  compat_features?: string[];
  usage_stats?: string;
  alias?: string;
}

const definitions: Ref<Definition[]> = ref([]);

onMounted(async () => {
  const definitionMap = import.meta.glob('./assets/definitions/*.json', {
    as: 'json',
  });

  for (const definition in definitionMap) {
    const content: any = await definitionMap[definition]();

    const name = definition.split('/').at(-1)!.split('.').at(0)!;

    definitions.value.push({
      name,
      ...content.default,
    });
  }
});
</script>

<template>
  <main class="m-4">
    <h1 class="text-xl font-bold text-green-700">Baseline Green</h1>

    <table>
      <thead>
        <tr>
          <th class="whitespace-nowrap p-2">Name</th>
          <th class="whitespace-nowrap p-2">Spec</th>
          <th class="whitespace-nowrap p-2">Status</th>
          <th class="whitespace-nowrap p-2">Caniuse</th>
          <th class="whitespace-nowrap p-2">Compat Features</th>
          <th class="whitespace-nowrap p-2">Usage Stats</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="definition in definitions"
          :key="definition.name"
          class="border-b border-gray-500"
        >
          <td>{{ definition.name }}</td>

          <td class="flex flex-col">
            <template v-if="Array.isArray(definition.spec)">
              <template v-for="spec in definition.spec" :key="spec">
                <a :href="spec" target="_blank">{{ spec }}</a>
              </template>
            </template>
            <template v-else>
              <a :href="definition.spec" target="_blank">
                {{ definition.spec }}
              </a>
            </template>
          </td>

          <td>
            <div v-if="definition.status" class="flex flex-col">
              <div class="flex gap-1">
                <span class="font-bold">Baseline:</span>

                <span
                  :class="{
                    'text-purple-800': definition.status.baseline === false,
                    'text-green-600': definition.status.baseline === 'high',
                    'text-green-700': definition.status.baseline === 'low',
                  }"
                >
                  {{ definition.status.baseline }}
                </span>

                <span v-if="definition.status.baseline_low_date">
                  {{ definition.status.baseline_low_date }}
                </span>
              </div>

              <table>
                <thead>
                  <tr>
                    <th
                      v-for="key in Object.keys(definition.status.support)"
                      :key="key"
                      class="whitespace-nowrap p-2"
                    >
                      {{ capitalCase(key) }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      v-for="[key, value] in Object.entries(
                        definition.status.support,
                      )"
                      :key="key"
                      class="text-center"
                    >
                      {{ value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>

          <td>
            <a
              v-if="definition.caniuse"
              :href="'https://caniuse.com/?search=' + definition.caniuse"
              target="_blank"
            >
              {{ definition.caniuse }}
            </a>
          </td>

          <td>
            <ul>
              <li v-for="feature in definition.compat_features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </td>

          <td>
            <a :href="definition.usage_stats" target="_blank">
              {{ definition.usage_stats }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style>
body {
  margin: 0;
  padding: 0;

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}
</style>
