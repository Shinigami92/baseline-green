import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

const content = await fetch(
  'https://github.com/web-platform-dx/web-features/tree/main/feature-group-definitions',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
).then((res) => res.json());

interface Item {
  name: string;
  path: string;
  contentType: 'file' | 'directory';
}
const items: Item[] = content.payload.tree.items;
const filteredItems = items.filter((item) => item.name.endsWith('.yml'));

const promises = filteredItems.map(async (item) => {
  const content = await fetch(
    `https://raw.githubusercontent.com/web-platform-dx/web-features/main/feature-group-definitions/${item.name}`,
    { method: 'GET' },
  ).then((res) => res.text());

  const path = join(
    'src',
    'assets',
    'definitions',
    item.name.replace('.yml', '.json'),
  );
  const parsedContent = parse(content);
  console.log(parsedContent);

  await writeFile(path, JSON.stringify(parsedContent, null, 2));
});

await Promise.allSettled(promises);
