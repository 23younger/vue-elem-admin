import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import { getRootPath } from "../utils";

/**
 * * unplugin-icons插件，自动引入iconify图标
 * usage: https://github.com/antfu/unplugin-icons
 * 图标库: https://icones.js.org/
 */
import Icons from "unplugin-icons/vite";

export default [
  AutoImport({
    imports: ["vue", "vue-router"],
    dts: false,
  }),
  Icons({
    compiler: "vue3",
    autoInstall: true,
    customCollections: {
      custom: FileSystemIconLoader(getRootPath("src", "assets/icons")),
    },
    scale: 1,
    defaultClass: "inline-block",
  }),
  Component({
    resolvers: [NaiveUiResolver(), IconsResolver({ customCollections: ["custom"], componentPrefix: "icon" })],
    dts: false,
  }),
];
