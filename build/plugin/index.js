import vue from "@vitejs/plugin-vue";

/**
 * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 * ? 在使用 Vue3.2 的 setup 语法糖后，无法优雅的定义组件的 name 值，
 * ? 虽然 vite 会根据组件的文件名自动生成组件名，但是需要自定义的组件名时，就很不方便。
 */
import VueSetupExtend from "vite-plugin-vue-setup-extend";

// ? rollup进行打包分析
import { visualizer } from "rollup-plugin-visualizer";

// ? 生成html配置
import { configHtmlPlugin } from "./html";

// ? 原子化css，处理css样式
import { unocss } from "./unocss";

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
    unocss(), // ! 放在configHtmlPlugin后面会报错
    configHtmlPlugin(viteEnv, isBuild),
  ];

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  return plugins;
}
