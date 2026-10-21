import { readdirSync, readFileSync } from 'node:fs';

// Read the original chapter files so upstream content remains the source of truth.
export const chapters = readdirSync(process.cwd())
  .filter((file) => /^\d{2}-.+\.md$/.test(file))
  .sort((a, b) => a.localeCompare(b, 'zh-CN'))
  .map((file) => {
    const title = readFileSync(file, 'utf8').match(/^# (.+)$/m)?.[1];
    if (!title) throw new Error(`Missing chapter title: ${file}`);
    const number = Number(file.slice(0, 2));
    return { file, title, number, link: `/chapters/${file.slice(0, 2)}` };
  });

export const version = readFileSync('VERSION', 'utf8').trim();
export const groups = [
  { text: '从这里开始', items: chapters.filter((c) => c.number === 0) },
  { text: '正文 · 从问题到价值', items: chapters.filter((c) => c.number >= 1 && c.number <= 8) },
  { text: '后记与附录', items: chapters.filter((c) => c.number >= 9) }
].map((group) => ({ ...group, items: group.items.map((c) => ({ text: c.title, link: c.link })) }));
