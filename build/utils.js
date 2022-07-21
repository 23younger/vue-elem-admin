/**
 * ! vite执行时相关方法配置
 */

// * node环境下统一处理env环境变量
export function wrapperEnv(envOptions) {
  if (!envOptions) return {};
  const rst = {};

  for (const key in envOptions) {
    let val = envOptions[key];
    if (["true", "false"].includes(val)) {
      val = val === "true";
    }
    if (["VITE_PORT"].includes(key)) {
      val = +val;
    }
    if (key === "VITE_PROXY" && val) {
      try {
        val = JSON.parse(val.replace(/'/g, '"'));
      } catch (error) {
        val = "";
      }
    }
    rst[key] = val;
    if (typeof key === "string") {
      process.env[key] = val;
    } else if (typeof key === "object") {
      process.env[key] = JSON.stringify(val);
    }
  }
  return rst;
}

// * 处理代理
const httpsReg = /^https:\/\//;
export function createProxy(list = []) {
  const res = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsReg.test(target);
    res[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      secure: isHttps,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
    };
  }
  return res;
}
