import { createApp } from "vue";
import "./styles/index.less";
import "uno.css";
import App from "./App.vue";
import { setupRputer } from "./route";
import { setupStore } from "./store";

const app = createApp(App);
setupStore(app);
setupRputer(app);
app.mount("#app");
