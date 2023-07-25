// packageA/canvasAr/canvasAr.js
const {
    API
} = require("../../utils/request");
import {
    navigateBack
} from "../../utils/navigate";
const app = getApp();
const NEAR = 0.001;
const FAR = 1000;
Page({
    data: {
        isIPhoneX: app.isIPhoneX,
        isShowScan: false,
        theme: "light",
        imgUrl: "",
        percentLine: 50,
        projectCode: "",
        width: 300,
        height: 300,
        renderWidth: 300,
        renderHeight: 300,
        loaded: false,
        positions: [
            [0, 0, 'rgba(44, 44, 44, 0.5)', ''],
            [0, 0, 'rgba(44, 44, 44, 0.5)', '']
        ],
        obsList: [],
        mediaList: [],
        paramList: [],
        mediaList2: [],
        i: 0,
        flag: false,
        gltfResList: [],
        videoResList: [],
        imageResList: [],
        video: '',
        videoFlag: false,
        Videowidth: '',
        Videoheight: '',
        translateX: -50,
        translateY: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        isShow: false,
        isShow2: false,
        indexFlag: false,
        successFlag: false,
        imageLight: false,
        imageLight2: false,
        indexList: [],
        imageList: ['/images/c/c11.png', '/images/c/c22.png', '/images/c/c33.png', '/images/c/c44.png', '/images/c/c55.png', '/images/c/c66.png'],
        imageList2: ['https://arp3.arsnowslide.com/undefined/386606254508167168/undefined/1686276424809.png', 'https://arp3.arsnowslide.com/undefined/386606254508167168/undefined/c2.png', 'https://arp3.arsnowslide.com/undefined/386606254508167168/undefined/c3.png', 'https://arp3.arsnowslide.com/undefined/386606254508167168/undefined/c4.png', 'https://arp3.arsnowslide.com/undefined/386606254508167168/undefined/c5.png', 'https://arp3.arsnowslide.com/undefined/386606254508167168/undefined/c6.png']



    },
    onShareAppMessage() {
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    title: '',
                })
            }, 3500)
        })
        return {
            title: '',
            promise
        }
    },
    //用户点击右上角分享朋友圈
    onShareTimeline: function () {
        return {
            title: '',
            query: {
                key: ''
            },
            imageUrl: ''
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onUnload() {
        console.log("页面detached");
        if (wx.offThemeChange) {
            wx.offThemeChange();
        }
        wx.removeStorageSync("projectCode");
    },
    async onLoad({
        param
    }) {

        // await wx.login({
        //     success: async (res) => {
        //         console.log(res)

        //         if (res.code) {
        //             const {
        //                 openid
        //             } = await API.login(`code=${res.code}`)
        //             this.openid = openid
        //             const res4 = await API.addPiece(`miniOpenId=${this.openid}&pieceCode=1`)
        //             console.log(openid)
        //             const res3 = await API.getPieceList(`miniOpenId=${openid}`)
        //             if (res3.length !== 0) {
        //                 res3.forEach(v => {
        //                     this.data.imageList[v] = this.data.imageList2[v]
        //                 })
        //             }
        //         } else {}
        //     },
        // });

        this.child = this.selectComponent('.xr');
        // let projectCode = wx.getStorageSync("projectCode");
        // wx.removeStorageSync("projectCode");
        // if (!projectCode) {
        //     projectCode = "312330376891027456";
        // }
        let obsList = [],
            mediaList = [],
            paramList = []
        let data = {
            projectCode: '386259646008479744'
        };
        let dataList = await API.selMediaApps(data);
        dataList.mediaList.forEach((value) => {
            switch (value.mediaType) {
                case 1:
                    obsList.push(value);
                    break;
                case 3:
                    mediaList.push(value);
                    break;
                case 4:
                    mediaList.push(value);
                    break;
                case 5:
                    mediaList.push(value);
                    break;
                default:
                    break;
            }
        });
        paramList = dataList.modelParamList
        const info = wx.getSystemInfoSync();
        const width = info.windowWidth;
        const height = info.windowHeight;
        const dpi = info.pixelRatio;
        const gltfResList = [];
        const videoResList = [];
        const imageResList = [];
        paramList = paramList.filter(i => {
            let flag = mediaList.some(v => {
                return v.mediaCode == i.mediaCode
            })
            if (flag) return true
        })
        paramList.forEach(e => {
            e.modelParamInfo = e.modelParamInfo.split("|")
        })
        console.log(paramList)

        const markerList = mediaList
        for (let i = 0; i < markerList.length; i++) {
            const marker = markerList[i];
            switch (marker.mediaType) {
                case 5:
                    gltfResList.push(marker);
                    break;
                case 4:
                    videoResList.push(marker);
                    break;
                case 3:
                    imageResList.push(marker);
                    break;
            }
        }
        console.log(gltfResList, videoResList, imageResList)
        this.setData({
            width,
            height,
            renderWidth: width * dpi,
            renderHeight: height * dpi,
            obsList,
            mediaList,
            paramList,
            gltfResList,
            videoResList,
            imageResList,
            flag: true,
            imageList: this.data.imageList2

        });
        console.log(obsList, mediaList, paramList, gltfResList, videoResList, imageResList)


    },
    closeVideo() {
        this.setData({
            videoFlag: false,

        })
    },
    videoShow({
        detail
    }) {
        console.log('videoshow')
        let translateX = -50 + parseInt(detail.params[0].modelParamInfo[0]) + '%'
        console.log(detail.params[0].modelParamInfo[0], translateX)
        this.setData({
            videoFlag: true,
            video: detail.video,
            Videoheight: 200 * detail.l * detail.params[1].modelParamInfo[0],
            Videowidth: 300 * detail.l * detail.params[1].modelParamInfo[0],
            // scale:,
            translateX: translateX,
            translateY: detail.params[0].modelParamInfo[1] + '%',
            rotateX: detail.params[2].modelParamInfo[0],
            rotateY: detail.params[2].modelParamInfo[1],


        })
    },
    changeModel({
        target
    }) {
        let index = target.dataset.index
        this.child.changeModel(index)
    },
    getContainer() {
        this.setData({
            isShow: !this.data.isShow
        })
    },
    exit() {},
    changeShow({
        detail
    }) {
        this.setData({
            isShowScan: detail.isShowScan
        })
    },
    // touchMove({ touches }) {
    //   if (this.reticle.visible == true) return;
    //   console.log(touches[0]);
    //   if ((oldTouches.length = 0)) {
    //     oldTouches.x = touches[0].x;
    //     oldTouches.y = touches[0].y;
    //   } else {
    //     changeX = oldTouches.x - touches[0].x;
    //     changeY = oldTouches.y - touches[0].y;
    //     this.model.rotation.set(
    //         changeY/5,
    //         changeX/5,
    //         0
    //       );
    //   }

    //   //   oldTouches = touches.pageX
    // },
    init() {
        this.initGL();
    },
    changeImage() {


        // this.animate(`#img1`, [{
        //         ease: 'ease',
        //         translateX: 0,
        //         translateY: 0,
        //         opacity: 1,
        //         duration: duration1,
        //         rotateY: 0,
        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 0,
        //         opacity: 1,
        //         translateY: 0,
        //         duration: duration2,
        //         rotateY: 0,

        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 12,
        //         translateY: 7,
        //         opacity: 1,
        //         duration: duration3,
        //         rotateY: 720,
        //     },

        // ], duration3)
        // this.animate(`#img2`, [{
        //         ease: 'ease',
        //         translateX: 0,
        //         translateY: 0,
        //         duration: duration1,
        //         opacity: 1,
        //         rotateY: 0,


        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 0,
        //         opacity: 1,
        //         translateY: 0,
        //         duration: duration2,
        //         rotateY: 0,

        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 0,
        //         translateY: 7,
        //         rotateY: 720,
        //         opacity: 1,
        //         duration: duration3
        //     },

        // ], duration3)
        // this.animate('#img5', [{
        //         ease: 'ease',
        //         translateX: 0,
        //         translateY: 0,
        //         duration: duration1,
        //         opacity: 1,
        //         rotateY: 0,


        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 0,
        //         opacity: 1,
        //         translateY: 0,
        //         duration: duration2,
        //         rotateY: 0,

        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 0,
        //         translateY: -3,
        //         rotateY: 720,
        //         opacity: 1,
        //         duration: duration3
        //     },
        // ], duration3)
        // this.animate(`#img3`, [{
        //         ease: 'ease',
        //         translateX: 0,
        //         translateY: 0,
        //         duration: duration1,
        //         opacity: 1,
        //         rotateY: 0,
        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 0,
        //         opacity: 1,
        //         translateY: 0,
        //         duration: duration2,
        //         rotateY: 0,
        //     },
        //     {
        //         ease: 'ease',
        //         translateX: -14,
        //         translateY: 7,
        //         opacity: 1,
        //         duration: duration3,
        //         rotateY: 720,
        //     },

        // ], duration3)
        // this.animate(`#img4`, [{
        //         ease: 'ease',
        //         translateX: 0,
        //         translateY: 0,
        //         duration: duration1,
        //         rotateY: 0,
        //         opacity: 1,

        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 0,
        //         opacity: 1,
        //         translateY: 0,
        //         duration: duration2,
        //         rotateY: 0,

        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 10,
        //         translateY: -3,
        //         rotateY: 720,
        //         opacity: 1,
        //         duration: duration3

        //     },

        // ], duration3)

        // this.animate(`#img6`, [{
        //         ease: 'ease',
        //         translateX: 0,
        //         translateY: 0,
        //         rotateY: 0,
        //         duration: duration1,
        //         opacity: 1,
        //     },
        //     {
        //         ease: 'ease',
        //         translateX: 0,
        //         opacity: 1,
        //         translateY: 0,
        //         rotateY: 0,
        //         duration: duration2,
        //     },
        //     {
        //         ease: 'ease',
        //         translateX: -12,
        //         translateY: -3,
        //         opacity: 1,
        //         rotateY: 720,
        //         duration: duration3
        //     },

        // ], duration3, () => {
        //     console.log('this.indexflag')

        //     this.setData({
        //         successFlag: true,
        //         isShow2: false,
        //         indexFlag: false,
        //     })
        //     if (this.data.successFlag) {
        //         this.animate(('#card-main3'), [{
        //                 ease: 'ease',
        //                 opacity: 0.9,
        //                 duration: 100
        //             },
        //             {
        //                 ease: 'ease',
        //                 opacity: 1,
        //                 duration: 6000
        //             },
        //             {
        //                 ease: 'ease',
        //                 opacity: 0,
        //                 duration: 2000
        //             }
        //         ], 8100, () => {
        //             console.log('123')
        //             this.setData({
        //                 isShow2: false,
        //                 successFlag: false,
        //                 indexFlag: false
        //             })

        //         })

        //     }


        // })
        console.log('this.indexflagindexflagindexflag')
        this.setData({
            imageLight: true
        })
        setTimeout(() => {
            this.setData({
                imageLight2: true,
                successFlag: true,
                isShow2: false,
                indexFlag: false,
            })
        },2000);
        setTimeout(() => {
            this.setData({
                successFlag: false,
                imageLight2: false,
                imageLight: false
            })
        }, 6500);
        let duration1 = 100
        let duration2 = 1500
        let duration3 = 2500
        // this.animate(`#banner2`, [{
        //         ease: 'ease-out',
        //         rotateY: 0,
        //         duration: duration1,
        //         opacity: 0.5,
        //         scale: [1,1,1],
        //         translateZ: 1
        //     },
        //     {
        //         ease: 'ease-out',
        //         opacity: 1,
        //         rotateY: 180,
        //         scale: [1.3,1.3,1.3],

        //         duration: duration2,
        //     },
        //     {
        //         ease: 'ease-out',
        //         opacity: 1,
        //         rotateY: 360,
        //         scale: [1,1,1],
        //         duration: duration3,
        //     },

        // ], 4000, () => {
        //     console.log('this.indexflag')

        //     // if (this.data.successFlag) {
        //     //     this.animate(('#card-main3'), [{
        //     //             ease: 'ease',
        //     //             opacity: 0.9,
        //     //             duration: 100
        //     //         },
        //     //         {
        //     //             ease: 'ease',
        //     //             opacity: 1,
        //     //             duration: 6000
        //     //         },
        //     //         {
        //     //             ease: 'ease',
        //     //             opacity: 0,
        //     //             duration: 2000
        //     //         }
        //     //     ], 8100, () => {
        //     //         console.log('123')
        //     //         this.setData({
        //     //             isShow2: false,
        //     //             successFlag: false,
        //     //             indexFlag: false
        //     //         })

        //     //     })

        //     // }
        // })

    },
    async getIndex({
        detail
    }) {
        let index = detail.index
        this.data.imageList[index] = this.data.imageList2[index]
        this.setData({
            imageList: this.data.imageList
        })
        //    const res= await API.addPiece({
        //         miniOpenId: this.openid,
        //         pieceCode: index
        //     })

        if (this.data.indexList.indexOf(index) === -1) {
            this.data.indexList.push(index)
        }
        console.log(this.data.indexList)
        // if (this.data.indexList.length === 6) {
        if (this.data.indexList.length !== 6) {
            this.setData({
                isShow2: true,
                indexFlag: true,
            })
        } else {
            this.setData({
                isShow2: true
            })
        }
        this.animate(`#img${index+1}`, [{
                ease: 'ease',
                translateX: 200,
                opacity: 0,
                duration: 100,
            },
            {
                ease: 'ease',
                translateX: 0,
                opacity: 1,
                duration: 1500
            },

        ], 1600, () => {
            if (this.data.indexFlag) {
                this.changeImage()
            } else {
                this.animate(('#card-main2'), [{
                        ease: 'ease',
                        opacity: 1,
                        duration: 100
                    },

                    {
                        ease: 'ease',
                        opacity: 0,
                        duration: 2000
                    }
                ], 2100, () => {
                    console.log('123')
                    this.setData({
                        isShow2: false,
                        successFlag: false,
                        indexFlag: false
                    })

                })
            }
        })


    },
    render(frame) {
        this.renderGL(frame);

        const camera = frame.camera;

        // 修改光标位置
        const reticle = this.reticle;
        if (reticle.visible == true) {
            const hitTestRes = this.session.hitTest(0.5, 0.5);
            if (hitTestRes.length) {
                reticle.matrixAutoUpdate = false;
                reticle.matrix.fromArray(hitTestRes[0].transform);
                reticle.matrix.decompose(
                    reticle.position,
                    reticle.quaternion,
                    reticle.scale
                );
            }
        }

        // 更新动画
        this.updateAnimation();

        // 相机
        if (camera) {
            this.camera.matrixAutoUpdate = false;
            this.camera.matrixWorldInverse.fromArray(camera.viewMatrix);
            // this.camera.matrixWorld.getInverse(this.camera.matrixWorldInverse);
            this.camera.matrixWorld.copy(this.camera.matrixWorldInverse).invert();
            const projectionMatrix = camera.getProjectionMatrix(NEAR, FAR);
            this.camera.projectionMatrix.fromArray(projectionMatrix);
            // this.camera.projectionMatrixInverse.getInverse(
            //   this.camera.projectionMatrix
            // );
            this.camera.projectionMatrixInverse
                .copy(this.camera.projectionMatrix)
                .invert();
        }

        this.renderer.autoClearColor = false;
        this.renderer.render(this.scene, this.camera);
        this.renderer.state.setCullFace(this.THREE.CullFaceNone);
    },
});