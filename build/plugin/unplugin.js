import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default [
  AutoImport({
    imports: ["vue", "vue-router"],
    dts: false,
  }),
  Component({
    resolvers: [NaiveUiResolver()],
  }),
];
