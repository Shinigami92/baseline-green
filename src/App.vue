<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, onMounted, ref } from 'vue';

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

const search = ref('');

const filteredDefinitions = computed(() => {
  if (!search.value) {
    return definitions.value;
  }

  return definitions.value.filter((definition) =>
    JSON.stringify(definition)
      .toLowerCase()
      .includes(search.value.toLowerCase()),
  );
});

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

    <input
      v-model="search"
      type="search"
      class="mb-4 mt-2 w-full rounded-md border border-gray-500 p-2"
      placeholder="Search"
    />

    <table class="w-full border-separate border-spacing-0">
      <thead class="sticky top-0 bg-white">
        <tr>
          <th colspan="2" />
          <th colspan="4" class="border-l border-gray-500">
            <div class="i-mdi-monitor inline-block" />
          </th>
          <th colspan="3" class="border-l border-gray-500">
            <div class="i-mdi-cellphone inline-block" />
          </th>
        </tr>

        <tr>
          <th class="whitespace-nowrap border-b border-gray-500 p-2">Name</th>
          <th class="whitespace-nowrap border-b border-gray-500 p-2">Status</th>
          <th class="w-12 border-b border-l border-gray-500 p-2 align-bottom">
            <div class="write-vertical-right flex inline-flex rotate-180 gap-1">
              <div class="i-mdi-google-chrome rotate-180" />
              <span>Chrome</span>
            </div>
          </th>
          <th class="w-12 border-b border-gray-500 p-2 align-bottom">
            <div class="write-vertical-right flex inline-flex rotate-180 gap-1">
              <div class="i-mdi-microsoft-edge rotate-180" />
              <span>Edge</span>
            </div>
          </th>
          <th class="w-12 border-b border-gray-500 p-2 align-bottom">
            <div class="write-vertical-right flex inline-flex rotate-180 gap-1">
              <div class="i-mdi-firefox rotate-180" />
              <span>Firefox</span>
            </div>
          </th>
          <th class="w-12 border-b border-gray-500 p-2 align-bottom">
            <div class="write-vertical-right flex inline-flex rotate-180 gap-1">
              <div class="i-mdi-apple-safari rotate-180" />
              <span>Safari</span>
            </div>
          </th>
          <th class="w-12 border-b border-l border-gray-500 p-2 align-bottom">
            <div class="write-vertical-right flex inline-flex rotate-180 gap-1">
              <div class="i-mdi-google-chrome rotate-180" />
              <span>Chrome</span>
            </div>
          </th>
          <th class="w-12 border-b border-gray-500 p-2 align-bottom">
            <div class="write-vertical-right flex inline-flex rotate-180 gap-1">
              <div class="i-mdi-firefox rotate-180" />
              <span>Firefox</span>
            </div>
          </th>
          <th class="w-12 border-b border-gray-500 p-2 align-bottom">
            <div class="write-vertical-right flex inline-flex rotate-180 gap-1">
              <div class="i-mdi-apple-safari rotate-180" />
              <span>Safari</span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <template
          v-for="definition in filteredDefinitions"
          :key="definition.name"
        >
          <tr>
            <!-- Name -->
            <td>{{ definition.name }}</td>

            <!-- Status -->
            <td>
              <div v-if="definition.status" class="flex flex-col p-2">
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
                </div>

                <span v-if="definition.status.baseline_low_date">
                  {{ definition.status.baseline_low_date }}
                </span>
              </div>
            </td>

            <!-- Chrome -->
            <td class="border-l border-gray-500 text-center">
              {{ definition.status?.support.chrome }}
            </td>

            <!-- Edge -->
            <td class="text-center">
              {{ definition.status?.support.edge }}
            </td>

            <!-- Firefox -->
            <td class="text-center">
              {{ definition.status?.support.firefox }}
            </td>

            <!-- Safari -->
            <td class="text-center">
              {{ definition.status?.support.safari }}
            </td>

            <!-- Chrome Android -->
            <td class="border-l border-gray-500 text-center">
              {{ definition.status?.support.chrome_android }}
            </td>

            <!-- Firefox Android -->
            <td class="text-center">
              {{ definition.status?.support.firefox_android }}
            </td>

            <!-- Safari iOS -->
            <td class="text-center">
              {{ definition.status?.support.safari_ios }}
            </td>
          </tr>
          <tr>
            <td colspan="2" class="border-b border-gray-500">
              <!-- Spec -->
              <div class="flex gap-1">
                <span class="font-bold">Spec: </span>
                <div class="flex flex-col">
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
                </div>
              </div>

              <!-- Caniuse -->
              <div v-if="definition.caniuse" class="flex gap-1">
                <span class="font-bold">Caniuse: </span>
                <template v-if="Array.isArray(definition.caniuse)">
                  <ul>
                    <li v-for="caniuse in definition.caniuse" :key="caniuse">
                      <a
                        v-if="caniuse"
                        :href="'https://caniuse.com/?search=' + caniuse"
                        target="_blank"
                      >
                        {{ caniuse }}
                      </a>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <a
                    v-if="definition.caniuse"
                    :href="'https://caniuse.com/?search=' + definition.caniuse"
                    target="_blank"
                  >
                    {{ definition.caniuse }}
                  </a>
                </template>
              </div>

              <!-- Compat Features -->
              <div v-if="definition.compat_features" class="flex gap-1">
                <span class="font-bold">Compat Features: </span>
                <ul>
                  <li
                    v-for="feature in definition.compat_features"
                    :key="feature"
                  >
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <!-- Usage Stats -->
              <div v-if="definition.usage_stats" class="flex gap-1">
                <span class="font-bold">Usage Stats: </span>
                <a :href="definition.usage_stats" target="_blank">
                  {{ definition.usage_stats }}
                </a>
              </div>
            </td>

            <td colspan="4" class="border-b border-l border-gray-500" />
            <td colspan="7" class="border-b border-l border-gray-500" />
          </tr>
        </template>
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
