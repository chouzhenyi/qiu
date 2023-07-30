type OtherValue = Record<string | number, any>;

class StatisticSDK {
  productID: string;
  Timing: Partial<PerformanceNavigationTiming & PerformanceEntry>;
  statisticURL: string;
  constructor({ productID, statisticURL }) {
    // SDK实例ID
    this.productID = productID;
    this.Timing = performance.getEntriesByType("navigation")[0];
    this.statisticURL = statisticURL;
  }
  send(query: OtherValue) {
    query.productID = this.productID;
    if (typeof navigator.sendBeacon === "function") {
      this.sendBeacon(query);
    }
  }
  // navigator.sendBeacon
  // 不会和主要业务代码抢占资源，而是在浏览器空闲时去做发送；
  // 并且在页面卸载时也能保证请求成功发送，不阻塞页面刷新和跳转；
  sendBeacon(data: Record<string, string | Blob>) {
    const form = new FormData();
    Object.entries(data).map(([key, value]) => {
      form.append(key, value);
    });
    navigator.sendBeacon(this.statisticURL, form);
  }
  event(key, val = {}) {
    this.send({ key, ...val });
  }
  pv() {
    this.event("pv", {
      href: decodeURIComponent(location.href),
    });
  }
  /**
        DNS查询耗时 ：domainLookupEnd - domainLookupStart
        TCP链接耗时 ：connectEnd - connectStart
        SSL安全连接耗时: connectEnd - secureConnectionStart
        request请求耗时 ：responseEnd - responseStart
        解析dom树耗时 ： domComplete - domInteractive
        首次渲染时间/白屏时间 ：responseStart - startTime
        domready时间 ：domContentLoadedEventEnd - startTime
        onload时间(总下载时间) ：duration
     * 
     */
  // 页面首次渲染时间: FP(firstPaint)=domLoading-navigationStart
  FP() {
    const { responseStart = 0, startTime = 0 } = this.Timing;
    this.event("FP", {
      fp: responseStart - startTime,
      label: "页面首次渲染时间",
    });
  }
  // DOM加载完成: DCL(DOMContentEventLoad)=domContentLoadedEventEnd-navigationStart
  DCL() {
    const { domContentLoadedEventEnd = 0, startTime = 0 } = this.Timing;
    this.event("DCL", {
      DCL: domContentLoadedEventEnd - startTime,
      label: "DOM加载完成",
    });
  }
  // 图片、样式等外链资源加载完成 (onload): L(Load)=loadEventEnd-navigationStart
  LOAD() {
    const { duration } = this.Timing;
    this.event("LOAD", {
      DCL: duration,
      label: "图片、样式等外链资源加载完成",
    });
  }
  // 常见页面性能监控
  initNormalPerformance() {
    this.FP();
    this.DCL();
    this.LOAD();
  }
  // 所有性能数据
  allPerformanceTiming() {
    const timing = {};
    const Timing = this.Timing;
    for (let i in Timing) {
      timing[i] = Timing[i];
    }
    setTimeout(() => {
      this.event("timing", {
        label: "timing",
        ...timing,
      });
    }, 1e2);
  }
  error(err, etraInfo?: OtherValue) {
    const { message, stack } = err;
    this.event("error", { message, stack, ...etraInfo });
  }
  // TODO: 错误监控上报
  initError() {
    window.addEventListener("error", (e) => {
      this.error(e);
    });
    window.addEventListener("unhandledrejection", ({ reason }) => {
      this.error(new Error(reason), { type: "unhandledrejection" });
    });
  }
}

// 用于vue挂载
export const statistic = (vm, options) => {
  const { global = true } = options;
  const instance = new StatisticSDK(options);
  // 全局埋点（默认开启）
  if (global) {
    instance.initError();
  }
  vm.prototype.$statistic = instance;
};

export default StatisticSDK;
