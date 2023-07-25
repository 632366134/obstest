// index.js
Page({
    data: {
        loaded: true,
        percent: 0,
        left: -2000,
        clickFlag: false,
        index: '',
        animationData: {}
    },
    onLoad() {

        const info = wx.getSystemInfoSync();
        const width = info.windowWidth;
        const height = info.windowHeight;
        const dpi = info.pixelRatio;
        console.log(width, height, width * dpi, height * dpi)
        this.setData({
            width,
            height,
            renderWidth: width * dpi,
            renderHeight: height * dpi
        });
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
                translateY:900,
                duration: 100
            },
            {
                scale: [1,1],
                rotate: 360,
                ease: 'ease',
                translateY:0,
                duration: 1000
            },
            {    scale: [1,1],
                rotate: 360,
                ease: 'ease',
                translateY:0,
                opacity:0,
                duration:2500
            },
        ], 3600, function () {
            this.setData({clickFlag:false})
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
            loaded: false,
            left: 0
        })

    },

})