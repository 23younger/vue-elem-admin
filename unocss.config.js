import { defineConfig, presetAttributify, presetUno, presetIcons } from "unocss";

export default defineConfig({
  exclude: ["node_modules", ".git", ".github", ".husky", ".vscode", "build", "dist", "mock", "public", "./stats.html"],
  presets: [presetUno(), presetAttributify(), presetIcons()],
  shortcuts: [
    ["wh-full", "w-full h-full"],
    ["f-c-c", "flex justify-center items-center"],
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ "border-color": `#${color}` })],
    [/^bgc-(.+)$/, ([, color]) => ({ "background-color": `#${color}` })],
  ],
});
