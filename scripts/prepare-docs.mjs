import { mkdir, copyFile, writeFile, readdir, readFile } from 'node:fs/promises';
import { chapters, version } from '../.vitepress/book.mjs';

if (!chapters.length) throw new Error('No numbered Markdown chapters found.');
const pdfs = (await readdir('.')).filter((file) => file.endsWith(`v${version}.pdf`));
if (pdfs.length !== 1) throw new Error(`Expected exactly one original PDF for VERSION ${version}.`);
await mkdir('public/downloads', { recursive: true });
await copyFile(pdfs[0], 'public/downloads/fde-book.pdf');
const introduction = `---\neditLink: false\nlastUpdated: false\n---\n\n# 全书目录\n\n范冰 著 · 当前仓库版本 **v${version}**。阅读内容直接来自仓库中的原始章节 Markdown。\n\n[从自序开始](${chapters[0].link}) · [下载原版 PDF](/downloads/fde-book.pdf) · [关于本书](/about)\n\n`;
let contents = introduction;
for (const chapter of chapters) {
  const source = await readFile(chapter.file, 'utf8');
  const sections = Array.from(source.matchAll(/^## (.+)$/gm), (match) => match[1]);
  contents += `## [${chapter.title}](${chapter.link})\n\n`;
  if (sections.length) contents += sections.map((section) => `- ${section}`).join('\n') + '\n\n';
}
await writeFile('contents.md', contents);
console.log(`Prepared ${chapters.length} chapters, table of contents and original PDF v${version}.`);
