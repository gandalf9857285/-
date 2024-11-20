import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import EslintPlugin from 'vite-plugin-eslint'
import StyleLintPlugin from 'vite-plugin-stylelint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

const styleLintConfig = StyleLintPlugin({
  files: ['src/**/*.{vue,scss}'],
  fix: true,
})

const eslintConfig = EslintPlugin({
  fix: true,
  cache: false,
})

const autoImportConfig = AutoImport({
  resolvers: [ElementPlusResolver()],
})

const componentsConfig = Components({
  resolvers: [ElementPlusResolver()],
})

const svgIconsConfig = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'src/01apps/assets/icons')],
  symbolId: 'icon-[dir]-[name]',
  inject: 'body-first',
  customDomId: '__svg__icons__dom__',
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') as ImportMetaEnv

  return {
    base: env.BASE_URL ?? '/',
    plugins: [vue(), styleLintConfig, eslintConfig, svgLoader(), svgIconsConfig, autoImportConfig, componentsConfig],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "apps/styles/resources" as *;',
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        apps: fileURLToPath(new URL('./src/01apps', import.meta.url)),
        processes: fileURLToPath(new URL('./src/02processes', import.meta.url)),
        pages: fileURLToPath(new URL('./src/03pages', import.meta.url)),
        widgets: fileURLToPath(new URL('./src/04widgets', import.meta.url)),
        features: fileURLToPath(new URL('./src/05features', import.meta.url)),
        entities: fileURLToPath(new URL('./src/06entities', import.meta.url)),
        shared: fileURLToPath(new URL('./src/07shared', import.meta.url)),
      },
    },
  }
})
