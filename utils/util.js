export const  formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// module.exports = {
//   formatTime
// }
export function errorHandler(errInfo) {
    let message = errInfo;
    if (typeof errInfo === "object") {
      if (errInfo instanceof Error) {
        message = errInfo.message;
        console.warn(errInfo.stack);
      } else if (errInfo.errMsg) {
        message = errInfo.errMsg;
      } else {
        message = Object.values(errInfo).join("; ");
      }
    }
    console.error(errInfo);
    wx.showToast({
      title: message,
      icon: "none",
    });
  }
  
  export function showAuthModal(page) {
    wx.showModal({
      title: "提示",
      content: "请给予“摄像头”权限",
      showCancel: false,
      success() {
        wx.openSetting({
          success({ authSetting: { "scope.camera": isGrantedCamera } }) {
            if (isGrantedCamera) {
              wx.redirectTo({ url: "/" + page.__route__ });
            } else {
              wx.showToast({ title: "获取“摄像头”权限失败！", icon: "none" });
            }
          },
        });
      },
    });
  }
  
  export function requestFile(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        dataType: "",
        responseType: "arraybuffer",
        success({ statusCode, data }) {
          if (statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`下载素材(${url})发生错误(状态码-${statusCode})`));
          }
        },
        fail: reject,
      });
    });
  }
  
  export function downloadFile(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success({ statusCode, tempFilePath }) {
          if (statusCode === 200) {
            resolve(tempFilePath);
          } else {
            reject(new Error(`下载文件：${url} 失败。statusCode：${statusCode}`));
          }
        },
        fail: reject,
      });
    });
  }

/**
 * 经纬度转xyz
 * @param longitude 经度
 * @param latitude 纬度
 * @param radius 半径
 */
export function lglt2xyz(lng, lat, radius){
    const phi = (180 + lng) * (Math.PI / 180)
    const theta = (90 - lat) * (Math.PI / 180)
    return {
      x: -radius * Math.sin(theta) * Math.cos(phi),
      y: radius * Math.cos(theta),
      z: radius * Math.sin(theta) * Math.sin(phi),
    }
 }
 export function throttle(func, marginTime) {
    if (marginTime == undefined || marginTime == null) {
      marginTime = 2000
    }
    let lastTime = null
    return function () {
      let currentTime = + new Date()
      if (currentTime - lastTime > marginTime || !lastTime) {
        func.apply(this, arguments)
        lastTime = currentTime
      }
    }
  }
  
   