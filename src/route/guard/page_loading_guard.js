import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });
export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    // to and from are both route objects. must call `next`.
    NProgress.start();
  });

  router.afterEach(() => {
    // to and from are both route objects.
    NProgress.done();
  });

  router.onError(() => {
    NProgress.done();
    ElMessage.error("页面加载失败，请稍后重试");
  });
}
