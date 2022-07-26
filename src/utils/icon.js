import { h } from "vue";
import { NIcon } from "naive-ui";
import { Icon } from "@iconify/vue";

export default function renderIcon(icon, props = { size: 12 }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) });
}
