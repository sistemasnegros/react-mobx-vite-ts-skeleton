import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import vitePluginImp from "vite-plugin-imp";

import { getThemeVariables } from "antd/dist/theme";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3001 },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style/index.js`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: getThemeVariables({
          // dark: true,
          // compact: true,
        }),
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: /^~/, replacement: "" },
    ],
  },
});
