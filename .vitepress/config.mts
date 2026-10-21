import { defineConfig } from 'vitepress';
import { chapters, groups, version } from './book.mjs';

const base = '/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer/';
const repo = 'https://github.com/a-persimmons/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer';

export default defineConfig({
  lang: 'zh-CN',
  title: 'FDE · 前线部署工程师',
  description: '范冰著《前线部署工程师：人工智能时代的客户价值交付秘籍》独立阅读站。从找对问题、赢得客户到部署、续约与规模化复制。',
  base,
  srcExclude: ['README.md'],
  cleanUrls: false,
  lastUpdated: true,
  rewrites: Object.fromEntries(chapters.map((c) => [c.file, `${c.link.slice(1)}.md`])),
  head: [
    ['meta', { name: 'theme-color', content: '#172f45' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'FDE 阅读手册',
    nav: [
      { text: '首页', link: '/' },
      { text: '全书目录', link: '/contents' },
      { text: '阅读资源', items: [
        { text: `原版 PDF · v${version}`, link: '/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer/downloads/fde-book.pdf' },
        { text: '关于本书', link: '/about' },
        { text: '原作者官网', link: 'https://fde4.ai' }
      ] }
    ],
    sidebar: groups.map((group) => ({ ...group, collapsed: false })),
    outline: { level: [2, 3], label: '本页目录' },
    socialLinks: [{ icon: 'github', link: repo }],
    editLink: { pattern: `${repo}/edit/main/:path`, text: '在 GitHub 上查看与编辑' },
    lastUpdated: { text: '最近更新', formatOptions: { dateStyle: 'medium' } },
    docFooter: { prev: '上一章', next: '下一章' },
    sidebarMenuLabel: '章节目录',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '切换外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到正文',
    footer: {
      message: '原作与著作权归范冰所有 · 免费阅读与非商业性分享 · 本站为独立阅读镜像',
      copyright: '来源：<a href="https://fde4.ai" target="_blank" rel="noopener noreferrer">fde4.ai</a> · <a href="https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer" target="_blank" rel="noopener noreferrer">原始仓库</a>'
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: { options: {
          // Apply the same Chinese word segmentation to indexed text and queries.
          tokenize: (text) => Array.from(new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text))
            .filter((part) => part.isWordLike).map((part) => part.segment)
        } },
        translations: {
          button: { buttonText: '搜索全书', buttonAriaLabel: '搜索全书' },
          modal: {
            displayDetails: '显示详细列表', resetButtonTitle: '清除搜索',
            backButtonTitle: '返回', noResultsText: '没有找到相关内容',
            footer: { selectText: '选择', selectKeyAriaLabel: '回车键', navigateText: '切换', navigateUpKeyAriaLabel: '向上键', navigateDownKeyAriaLabel: '向下键', closeText: '关闭', closeKeyAriaLabel: '退出键' }
          }
        }
      }
    }
  }
});
