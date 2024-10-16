import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DevNotes",
  description: "开发笔记",
  base: '/DevNotes/',
  head: [ // 网站图标
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  appearance: true, // 默认 true，设为 false 则无法切换dark/light主题，可选 'dark' true false
  markdown: {
    lineNumbers: false // 是否显示行数，默认false
  },
  themeConfig: {
    logo: '/logo.svg',
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/Yuimng/DevNotes/tree/main/docs/:path',
      text: '建议修改此页'
    },
    // 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Yuimng/DevNotes' }
    ],
    search: { // vitepress 内置 search
      provider: 'local'
    },
    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2023-present The Muse Catcher'
    // },
    nav: [
      { text: 'JavaScript', link: '/javascript/started', activeMatch: '/javascript/' },
      {
        text: 'Links',
        items: [
          { text: 'My Github', link: 'https://github.com/Yuimng' },
          { text: 'Ant Design Vue', link: 'https://www.antdv.com/docs/vue/introduce-cn' },
          { text: 'Element Plus', link: 'https://element-plus.org/zh-CN/' },
          { text: 'Arco Design Vue', link: 'https://arco.design/vue/docs/start' },
          {
            items: [
              {
                text: 'Vite',
                link: 'https://cn.vitejs.dev/'
              },
              {
                text: 'Rollup',
                link: 'https://cn.rollupjs.org/'
              },
              {
                text: 'VitePress',
                link: 'https://vitepress.dev/'
              },
              {
                text: 'Markdown',
                link: 'https://markdown.com.cn/'
              },
              {
                text: 'npm',
                link: 'https://www.npmjs.com/'
              },
              {
                text: 'pnpm',
                link: 'https://www.pnpm.cn/'
              }
            ]
          }
        ]
      },
      {
        text: 'Docs',
        items: [
          {
            text: 'Vue 2 Docs',
            link: 'https://v2.cn.vuejs.org/v2/guide/'
          },
          {
            text: 'Vue 3 Docs',
            link: 'https://cn.vuejs.org/guide/introduction.html'
          },
          {
            text: 'VueUse',
            link: 'https://vueuse.org/'
          },
          {
            text: 'TypeScript Docs',
            link: 'https://www.tslang.cn/docs/home.html'
          },
          {
            text: 'MDN Web Docs',
            link: 'https://developer.mozilla.org/zh-CN/'
          }
        ]
      }
    ],
    sidebar: {
      '/javascript/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/javascript/started'
            }
          ]
        },
        {
          text: 'JavaScript Notes',
          items: [
            {
              text: 'No.1',
              link: '/javascript/notes/No.1'
            },
          ]
        }
      ]
    }
  }
})



