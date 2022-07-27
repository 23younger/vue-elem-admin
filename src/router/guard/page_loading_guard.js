export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    // to and from are both route objects. must call `next`.
    $loadingBar?.start();
  });

  router.afterEach(() => {
    // to and from are both route objects.
    $loadingBar?.finish();
  });

  router.onError(() => {
    $loadingBar?.error();
  });
}
