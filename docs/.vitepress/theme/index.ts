// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme


