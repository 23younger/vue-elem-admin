import { defineConfig, loadEnv } from "vite";
import { wrapperEnv, createProxy } from "./build/utils";
import { createVitePlugins } from "./build/plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  const isBuild = command === "build";
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    base: VITE_PUBLIC_PATH || "/",
    css: {
      preprocessorOptions: {
        // define global less variable
        less: {
          additionalData: `@import '@/styles/variables.less';`,
        },
      },
    },
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
  };
});
