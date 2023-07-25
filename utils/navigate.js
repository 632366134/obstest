//  这里引入第一步创建的route.js文件
import route from "./route";
// 封装路由方法
/**
 * function
 * @param {string} url 目标页面的路由
 * @param {Object} param 传递给目标页面的参数
 * @param {number} time 延时跳转，默认不延时
 * @description  处理目标页面的参数，转成json字符串传递给param字段，在目标页面通过JSON.parse(options.param)接收 保留当前页面，跳转到应用内的某个页面
 */
export function goTo(url, param = {}, time = 0) {
  //  对参数进行处理
  let _url = route[url];

  if (param !== {}) {
    route[url] += `?param=${JSON.stringify(param)}`;
  }
  setTimeout(() => {
    //  延时跳转处理默认不延时
    wx.navigateTo({
      url: route[url], //  根据传递过来的key值从route.js文件去除对应路径
      fail(err) {
        console.log("navigateTo跳转出错", err);
      },
      complete() {
        route[url] = _url;
      },
    });
  }, time);
}

/**
 * function
 * @param {string} url 目标页面的路由
 * @param {Object} param 传递给目标页面的参数，只有页面栈无目标页面调用navigateTo时，参数才会生效，单单返回不能设置参数
 * @param {number} time 延时跳转，默认不延时
 * @description  先取出页面栈，页面栈最多十层，判断目标页面是否在页面栈中，如果在，则通过目标页的位置，返回到目标页面，否则调用navigateTo方法跳转到目标页
 */
export function navigateBack(url, param = {}) {
  let _url = route[url];
  const pagesList = getCurrentPages();
  let index = pagesList.findIndex((e) => {
    return _url?.indexOf(e.route) >= 0;
  });
  if (index == -1) {
    // 没有在页面栈中，可以调用navigateTo方法
    goTo(url, param);
  } else {
    wx.nextTick(() => {
      console.log(pagesList.length, index, "pagesList.length - 1 - index");

      wx.navigateBack({
        delta: pagesList.length - 1 - index,
        success(res) {
          console.log(res, "success");
        },
        fail(err) {
          goTo(url, param);
          console.log("navigateBack返回出错", err);
        },
        complete() {
          console.log("naviga234234返回出错");

          route[url] = _url;
        },
      });
    });
  }
}

export function switchTab(url) {
  // 封装switchTab，switchTab不能有参数
  wx.switchTab({
    url: route[url],
  });
}
export function redirectTo(url, param = {}, time = 0) {
  // 封装redirectTo，和navigateTo没啥区别
  let _url = route[url];

  if (param) {
    route[url] += `?param=${JSON.stringify(param)}`;
  }
  setTimeout(() => {
    wx.redirectTo({
      url: route[url],
      fail(err) {
        console.log("redirectTo跳转出错", err);
      },
      complete() {
        route[url] = _url;
      },
    });
  }, time);
}
export function reLaunch(url, param = {}) {
  // 关闭所有页面，打开到应用内的某个页面。
  let _url = route[url];

  if (param) {
    route[url] += `?param=${JSON.stringify(param)}`;
  }
  wx.reLaunch({
    url: route[url],
    fail(err) {
      console.log("reLaunch跳转出错", err);
    },
    complete() {
      route[url] = _url;
    },
  });
}
