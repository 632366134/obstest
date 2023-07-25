// const baseUrl = "https://www.arsnowslide.com/";
const baseUrl = "http://192.168.0.8:8081/";

function request(method, url, data) {
    return new Promise((resolve, reject) => {
        let header = {
            "content-type": "application/json",
        };

        wx.request({
            url: baseUrl + url,
            method: method,
            header: header,
            data: method === "POST" ? JSON.stringify(data) : data,
            success: (res) => {
                if (res.data.code === 1000) {
                    // wx.hideToast()
                    resolve(res.data.data);
                } else if (res.data.code === 1006) {
                    wx.showToast({
                        title: `${res.data.message}`,
                        icon: 'none'
                    })
                    resolve(res.data);
                } else {
                    wx.showToast({
                        title: `${res.data.status}${res.data.error}`,
                        icon: 'error'
                    })
                    console.log(res)
                    resolve(res.data);
                }
            },
            fail: (err) => {
                wx.showToast({
                    title: `${err.data.status}${err.data.error}`,
                    icon: 'error'
                })
                reject(err);
            },
        });
    });
}

function request2(method, url, data) {
    return new Promise((resolve, reject) => {
        let header = {
            "content-type": "application/json",
        };

        wx.request({
            url: 'https://www.arsnowslide.com/' + url,
            method: method,
            header: header,
            data: method === "POST" ? JSON.stringify(data) : data,
            success: (res) => {
                if (res.data.code === 1000) {
                    // wx.hideToast()
                    resolve(res.data.data);
                } else if (res.data.code === 1006) {
                    wx.showToast({
                        title: `${res.data.message}`,
                        icon: 'none'
                    })
                    resolve(res.data);
                } else {
                    wx.showToast({
                        title: `${res.data.status}${res.data.error}`,
                        icon: 'error'
                    })
                    console.log(res)
                    resolve(res.data);
                }
            },
            fail: (err) => {
                wx.showToast({
                    title: `${err.data.status}${err.data.error}`,
                    icon: 'error'
                })
                reject(err);
            },
        });
    });
}
const code = wx.getStorageSync("userCode");
const API = {
    selProjects: (data) =>
        request2("POST", "brounche/resource/selAllProjectsOnWx", data),
    selMediaApps: (data) =>
        request2("POST", "brounche/resource/selMediaApps", data),
    selProjectsOnName: (data) =>
        request("POST", `brounche/resource/selProjectsOnName?${data}`),
    selProjectsOnNameByPage: (data) =>
        request("POST", `brounche/resource/selProjectsOnNameByPage?${data}`),
    selProjectsOnCompanyNameByPage: (data) =>
        request("POST", `brounche/resource/selProjectsOnCompanyNameByPage?${data}`),
    getPhone: (data) =>
        request("POST", `brounche/WxUser/getPhone?${data}`),
    login: (data) =>
        request("POST", `brounche/WxUser/getOpenId?${data}`),
    getPieceList: (data) =>
        request("GET", `brounche/wx/multi/function/user/piece/list?${data}`),
    addPiece: (data) =>
        request("POST", `brounche/wx/multi/function/user/piece/add?${data}`),
    getPocketList: (data) =>
        request("POST", "brounche/wx/multi/function/user/red/pocket/list", data),
    addPocket: (data) =>
        request("POST", "brounche/wx/multi/function/user/red/pocket/add", data),
};
module.exports = {
    API,
};