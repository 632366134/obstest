// index.js
var app = getApp();
const {
    API
} = require("../../utils/request");

import {
    throttle
} from "../../utils/util";
Page({
    data: {
        loaded: false,
        idList: [],
        percent: 0,
        left: -2000,
        clickFlag: false,
        redListFlag: false,
        index: '',
        animationData: {},
        redpngFlag: false,
        redMainFlag: false,
        isIPhoneX: app.isIPhoneX,
        rewardList2: [],
        rewardList: [{
                "name": "服装优惠券",
                "description": "满200减50优惠券",
                "minPurchaseAmount": 200,
                "discountAmount": 50,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            },
            {
                "name": "美食优惠券",
                "description": "满100减15优惠券",
                "minPurchaseAmount": 100,
                "discountAmount": 15,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            },
            {
                "name": "家居优惠券",
                "description": "满500减100优惠券",
                "minPurchaseAmount": 500,
                "discountAmount": 100,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            },
            {
                "name": "运动优惠券",
                "description": "满150减30优惠券",
                "minPurchaseAmount": 150,
                "discountAmount": 30,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            },
            {
                "name": "服装优惠券",
                "description": "满200减50优惠券",
                "minPurchaseAmount": 200,
                "discountAmount": 50,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            },
            {
                "name": "美食优惠券",
                "description": "满100减15优惠券",
                "minPurchaseAmount": 100,
                "discountAmount": 15,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            },
            {
                "name": "家居优惠券",
                "description": "满500减100优惠券",
                "minPurchaseAmount": 500,
                "discountAmount": 100,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            },
            {
                "name": "运动优惠券",
                "description": "满150减30优惠券",
                "minPurchaseAmount": 150,
                "discountAmount": 30,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            }, {
                "name": "咖啡优惠券",
                "description": "满40减20优惠券",
                "minPurchaseAmount": 40,
                "discountAmount": 20,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            }, {
                "name": "咖啡优惠券",
                "description": "满30减15优惠券",
                "minPurchaseAmount": 30,
                "discountAmount": 15,
                "expiryDate": "2023-09-30",
                "rules": "使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则使用规则"
            },
        ],
        flag: false
    },
    onUnload() {
        this.setData({
            flag: false
        })
    },
    async onLoad() {

        const info = wx.getSystemInfoSync();
        const width = info.windowWidth;
        const height = info.windowHeight;
        const dpi = info.pixelRatio;
        console.log(width, height, width * dpi, height * dpi)
        await wx.login({
            success: async (res) => {
                console.log(res)

                if (res.code) {
                    const {
                        openid
                    } = await API.login(`code=${res.code}`)
                    this.openid = openid
                    // const res4 = await API.addPiece(`miniOpenId=${this.openid}&redPocketCode=2`)
                    // console.log(res4)
                    const res3 = await API.getPocketList(`miniOpenId=${openid}`)

                    let rewardList2 = []
                    console.log(res3)
                    if (res3.length !== 0) {
                        res3.forEach(v => {
                            rewardList2.unshift(this.data.rewardList[v.redPocketCode])
                        })
                        console.log(rewardList2)
                        wx.setStorageSync('rewardList2', rewardList2)
                    }
                } else {}
            },
        });

        this.setData({
            width,
            height,
            renderWidth: width * dpi,
            renderHeight: height * dpi,
            flag: true
        });
        // this.clickChange({
        //     detail: {
        //         flag: true,
        //         index: 2
        //     }
        // })
    },
    onShow() {
        // var animation = this.animation = wx.createAnimation({
        //     duration: 1500,
        //     timingFunction: 'ease',
        // })

        // this.rotateAndScale()

    },
    rotateAndScale: function () {
        // 旋转同时放大
        this.animation.scale(0.1, 0.1).rotate(180).translateY(900).step({
            duration: 100
        }).rotate(360).translateY(0).scale(1, 1).step({
            duration: 1000
        })
        // this.animation.opacity(0).step({
        //     duration: 2000
        // })
        this.setData({
            animationData: this.animation.export()
        })
        // setTimeout(() => {
        //     this.setData({clickFlag:false})
        // }, 3000);
    },
    clickChange({
        detail
    }) {
        console.log(detail)
        this.setData({
            clickFlag: detail.flag,
            index: detail.index
        })
        this.animate('.red', [{
                scale: [0.1, 0.1],
                rotate: 180,
                ease: 'ease',
                translateY: 900,
                duration: 100
            },
            {
                scale: [1, 1],
                rotate: 360,
                ease: 'ease',
                translateY: 0,
                duration: 1000
            }
        ], 1100, function () {
            // this.setData({clickFlag:false})
        }.bind(this))
    },
    myProcess({
        detail
    }) {
        console.log(detail)
        this.setData({
            percent: detail
        })
    },
    myLoaded({
        detail
    }) {
        console.log('object');
        this.setData({
            loaded: true,
            left: 0
        })

    },
    back: throttle(function () {
        this.setData({
            redMainFlag: false
        })
    }),
    GoRedList: throttle(function () {
        this.setData({
            redListFlag: true
        })
    }),
    fetchRed: throttle(async function () {
        // let rewardList2 = wx.getStorageSync('rewardList2') || []
        // rewardList2.unshift(this.data.rewardList[this.data.index])
        console.log(this.data.index)
        const res = await API.addPocket(`miniOpenId=${this.openid}&redPocketCode=${this.data.index}`)
        const res3 = await API.getPocketList(`miniOpenId=${this.openid}`)
        let rewardList2 = []
        console.log(res3)
        if (res3.length !== 0) {
            res3.forEach(v => {
                rewardList2.unshift(this.data.rewardList[v.redPocketCode])
            })

            wx.setStorageSync('rewardList2', rewardList2)
            console.log(rewardList2)
        }
        this.animate('.red', [{
                scale: [1, 1],
                rotateZ: 0,
                ease: 'ease',
                duration: 100,
            },
            {
                scale: [1, 1],
                rotateZ: 720,
                ease: 'ease',
                duration: 500,

            }
        ], 600, function () {
            this.setData({
                redpngFlag: true,
                clickFlag: false
            })
            this.animate('.red2', [{
                    scale: [1, 1],
                    ease: 'ease',
                    duration: 100
                },
                {
                    scale: [1.7, 1.7],
                    ease: 'ease',
                    duration: 500
                }
            ], 300, function () {

                this.setData({
                    redpngFlag: false,
                    redMainFlag: true,

                })
            }.bind(this))
        }.bind(this))
    }, null),
    updateRedListFlag: throttle(function () {
        this.setData({
            redListFlag: false
        });
    })

})