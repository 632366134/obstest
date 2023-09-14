let oldRotation
let r
let r2
let x
let z
import {
    throttle
} from "../../utils/util";
Component({
    behaviors: [require('../common/share-behavior').default],
    properties: {
        a: Number,
    },
    data: {
        loaded: false,
        arReady: false,
        flag: false,
        rotation: 0,
        x: '0',
        z: 0,
        ry: 180,
        flag1: false,
        visible: false,
        list: []
    },
    lifetimes: {
        async attached() {
            let list = []

            const fun = (i) => {
                const x = this.getPosition()
                const z = this.getPosition()
                const r = this.getRotation()
                let object = {
                    x,
                    z,
                    r,
                    i
                }
                list.push(object)
            }
            for (let i = 0; i <= 9; i++) {
                fun(i)
            }
            this.setData({
                list
            })
            console.log(list)
        },
        detached() {
            this.scene.assets.releaseAsset('gltf', 'gltfitem');
        }
    },

    methods: {
        // show() {
        //     if (!this.data.flag1) {
        //         return
        //     }
        //     console.log('show')
        //     this.change()
        // },
        handlepause() {

            // this.setData({
            //     x: 0,
            //     z: 0,
            //     visible: false,
            //     ry: 180
            // })

            // this.n.removeChild(this.xrgltf);


        },
        async handleresume() {
            //    setTimeout(() => {
            //        console.log('timeout')
            //     wx.startDeviceMotionListening({
            //         success: () => {
            //             this.listener = ({alpha,beta,gamma}) => {
            //                 if(gamma<=0){
            //                     alpha = alpha-(90-beta)
            //                     alpha= alpha<0?!alpha :alpha
            //                 }else {
            //                     alpha = alpha+(90-beta)
            //                     alpha = alpha>360? alpha-360 :alpha
            //                 }
            //                 // oldRotation = res.direction
            //                 // r = oldRotation > 180 ? 360 - oldRotation : -oldRotation
            //                 r= alpha
            //                 console.log(alpha)
            //                 r2 = alpha * Math.PI / 180
            //                 console.log(r2)
            //                 wx.getLocation({
            //                     type: "wgs84",
            //                     isHighAccuracy: true,
            //                     success: (res) => {
            //                         let p2 = this.Wgs84ToMector2(res.latitude + 0.00001, res.longitude)
            //                         let p = this.Wgs84ToMector2(res.latitude, res.longitude)

            //                         let p3 = p2.map((value, index) => value - p[index]);
            //                         console.log(p3)
            //                         x = p3[0] * Math.cos(r2) - (-p3[1] * Math.sin(r2))
            //                         z = p3[0] * Math.sin(r2) + (-p3[1] * Math.cos(r2))
            //                         console.log(x, z)
            //                         // this.setData({
            //                         //     x: x,
            //                         //     z,
            //                         //     ry: 180 - r,
            //                         //     flag1: true,
            //                         //     visible: true
            //                         // })
            //                         this.GLTF.setData({
            //                             model: this.gltfModel.value
            //                         })
            //                         this.trs.setData({
            //                             rotation: [0, 180 - r, 0],
            //                             position: [x, 0, z],
            //                             scale: [0.1, 0.1, 0.1]
            //                         })
            //                     }
            //                 })
            //                 wx.offDeviceMotionChange(this.listener)

            //             }
            //             wx.onDeviceMotionChange(this.listener)
            //         }
            //     })
            //    }, 1000);

        },
        async handleGltfLoaded() {},
        // Wgs84ToMector2(lat, lng) {
        //     const proj4 = require('proj4');
        //     return proj4(proj4('EPSG:4326'), proj4('EPSG:3857'), [lng, lat])
        // },
        handleAssetsProgress: function ({
            detail
        }) {
            console.log('assets progress', detail.value);


            this.triggerEvent('process', detail.value.progress * 100)
        },
        handleAssetsLoaded: function ({
            detail
        }) {
            console.log('assets loaded', detail.value);
            this.triggerEvent('loaded', true)
            wx.showToast({
                title: '寻找周围的红包吧!',
                icon: 'success',
                duration: 2000
            })
        },
        async change(i) {
            // console.log('change')
            // const x = this.getPosition()
            // const z = this.getPosition()
            // const r = this.getRotation()
            // this.xrgltf = this.scene.getElementById(`gltf-${i}`)
            // console.log(this.xrgltf)
            // this.GLTF = this.xrgltf.getComponent(this.xrFrameSystem.GLTF)
            // this.trs = this.xrgltf.getComponent(this.xrFrameSystem.Transform);

            // this.trs.setData({
            //     rotation: [0, r, 0],
            //     position: [x, 0, z],
            // })
            // this.scene.event.add('tick', this.handleTick.bind(this));
            // this.lookTrs = this.xrgltf.getComponent(this.xrFrameSystem.Transform);
            // this.cameraTrs = this.scene.getElementById('camera').getComponent(this.xrFrameSystem.Transform);



        },
        logFunction: throttle(async function ({
            target
        }) {
            // console.log('touch', target.id)
            // wx.showToast({
            //   title: `恭喜你抽中红包${target.id}号`,
            // })
            console.log('logFunction')
            await this.triggerEvent('clickChange', {
                flag: true,
                index: target.id
            })
            this.xrGltf = this.scene.getElementById('xrGltf')
            this.xrGltf.removeChild(this.scene.getElementById(`${target.id}`))

        }, null),
        // async change() {
        //     wx.startDeviceMotionListening({
        //         success: () => {
        //             this.listener = ({
        //                 alpha,
        //                 beta,
        //                 gamma
        //             }) => {
        //                 if (gamma <= 0) {
        //                     alpha = alpha - (90 - beta)
        //                     alpha = alpha < 0 ? !alpha : alpha
        //                 } else {
        //                     alpha = alpha + (90 - beta)
        //                     alpha = alpha > 360 ? alpha - 360 : alpha
        //                 }
        //                 // oldRotation = res.direction
        //                 // r = oldRotation > 180 ? 360 - oldRotation : -oldRotation
        //                 r = alpha
        //                 console.log(alpha)
        //                 r2 = alpha * Math.PI / 180
        //                 console.log(r2)
        //                 wx.getLocation({
        //                     type: "gcj02",
        //                     isHighAccuracy: true,
        //                     highAccuracyExpireTime: 5000,
        //                     success: (res) => {

        //                         console.log(res.latitude, res.longitude)
        //                         let p2 = this.Wgs84ToMector2(31.5471337890625, 120.24570638020833)
        //                         let p = this.Wgs84ToMector2(res.latitude, res.longitude)

        //                         let p3 = p2.map((value, index) => value - p[index]);
        //                         console.log(p3)
        //                         x = p3[0] * Math.cos(r2) - (-p3[1] * Math.sin(r2))
        //                         z = p3[0] * Math.sin(r2) + (-p3[1] * Math.cos(r2))
        //                         console.log(x, z)
        //                         // this.setData({
        //                         //     x: x,
        //                         //     z,
        //                         //     ry: 180 - r,
        //                         //     flag1: true,
        //                         //     visible: true
        //                         // })
        //                         this.GLTF.setData({
        //                             model: this.gltfModel.value
        //                         })
        //                         this.trs.setData({
        //                             rotation: [0, -r, 0],
        //                             position: [x, 0, z],
        //                             scale: [0.1, 0.1, 0.1]
        //                         })
        //                         this.scene.event.add('tick', this.handleTick.bind(this));
        //                         this.lookTrs = this.scene.getElementById('n').getComponent(this.xrFrameSystem.Transform);
        //                         this.cameraTrs = this.scene.getElementById('camera').getComponent(this.xrFrameSystem.Transform);
        //                         this.scene.addChild(this.xrgltf);

        //                     }
        //                 })
        //                 wx.offDeviceMotionChange(this.listener)

        //             }
        //             wx.onDeviceMotionChange(this.listener)
        //         }
        //     })


        // },
        getPosition() {
            const randomNumber = (Math.random() * 20 - 10).toFixed(7);
            return randomNumber
        },
        getRotation() {
            let randomNum = Math.floor(Math.random() * 361) - 180;
            return randomNum
        },
        handleTick(dt) {
            if (this.lookTrs) {
                const {
                    Vector3,
                    Quaternion
                } = this.xrFrameSystem
                let FACING = Vector3.createFromNumber(0, 0, 0);
                let UP = Vector3.createFromNumber(0, 1, 0);
                const quaternion = this.lookTrs.quaternion;
                // 算出从物体到相机的向量
                FACING.set(this.cameraTrs.position).sub(this.lookTrs.position, FACING);
                Quaternion.lookRotation(FACING, UP, quaternion);
            }
        },
        handleARReady() {
            this.setData({
                arReady: true
            })
            console.log('arready')
            const scene = this.scene
            let list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            list.forEach((element, index) => {
                this.change(index)

            });
        },

        handleReady: async function ({
            detail
        }) {
            // wx.startDeviceMotionListening({
            //     success: () => {
            //         wx.onDeviceMotionChange((e)=> {console.log(e)})

            //     }
            // })
            const xrFrameSystem = this.xrFrameSystem = wx.getXrFrameSystem()

            const scene = this.scene = detail.value;
            // this.camera = this.scene.getElementById("camera");
            // this.anchor = this.scene.getNodeById('anchor');
            // this.gltfModel = await scene.assets.loadAsset({
            //     type: 'gltf',
            //     assetId: 'gltf',
            //     src: 'https://arp3.arsnowslide.com/undefined/385971493892739072/undefined/dengta.glb',
            //     options: {
            //         "ignoreError": '-1'
            //     }
            // })

            // this.triggerEvent('loaded', true)
        },
        handleTrackerSwitch(e) {
            // const xrFrameSystem = wx.getXrFrameSystem()
            // const camera = this.scene.getElementById('camera').getComponent(xrFrameSystem.Camera);
            // const trackerTRS =  this.scene.getElementById('osd').getComponent(xrFrameSystem.Transform)
            // const rightTRS = this.scene.getElementById('setitem').getComponent(xrFrameSystem.Transform);
            // const trackerPos = camera.convertWorldPositionToClip(trackerTRS.worldPosition)
            // const rightPos = camera.convertWorldPositionToClip(rightTRS.worldPosition)
            // console.log(rightTRS.position)
            // this.scene.getElementById('gltf').getComponent(xrFrameSystem.Transform).position.setArray(rightTRS.position);

        }

    }
})