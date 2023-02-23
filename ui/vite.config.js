import to from '@adaptably/to'
import { VitePWA } from 'vite-plugin-pwa'
import { imagetools } from 'vite-imagetools'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import pwaConfig from './vite.pwa.config.js'
import adapt from '@adaptably/adapt'

// --------------------------------------------

export default {
  define: {
    _version_: 400, // version number times 100 (started with 400) -- treated like a number even if we add quotes
    _demoApi_: JSON.stringify(adapt('apis.dev')),
    _realApi_: JSON.stringify(adapt('apis.production')),
  },

  plugins: [imagetools(), svelte(), VitePWA(pwaConfig)],

  resolve: {
    alias: {
      '#store.js': to('./src/store.js', { from: import.meta.url }),
      '#utils.js': to('./src/utils.js', { from: import.meta.url }),
      '#modules': to('./src/modules', { from: import.meta.url }),
    },
  },

  server: {
    port: adapt('port'),
  },

  test: {
    environment: "jsdom",
    globals: true,
    mockReset: true,
    setupFiles: './tests/support.js',
    threads: false,
  },
};
