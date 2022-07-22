import { createPageLoadingGuard } from "./page_loading_guard";
import { createPageTitleGuard } from "./page_title_guard";

export function createGuard(router) {
  createPageLoadingGuard(router);
  createPageTitleGuard(router);
}
