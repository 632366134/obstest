// components/myRedList/index1.js
var app = getApp();
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        redListFlag: {
            type: Boolean,
            default: false
        }
    },
    observers: {
        redListFlag(newVal) {
            this.setData({
                redListFlag1: newVal,
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        redListFlag1: false,
        isIPhoneX: app.isIPhoneX,
        rewardList2: []

    },

    /**
     * 组件的方法列表
     */
    lifetimes: {
        async attached() {
            const rewardList2 = await wx.getStorageSync('rewardList2') || []
            console.log(rewardList2)
            this.setData({
                rewardList2
            })
        }
    },
    methods: {
        back(){
            this.triggerEvent('updateRedListFlag');
        },
    }
})