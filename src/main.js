import { createApp } from "vue";
import "./styles/index.less";
import "uno.css";
import App from "./App.vue";
import { setupRputer } from "./route";

const app = createApp(App);

setupRputer(app);

app.mount("#app");
