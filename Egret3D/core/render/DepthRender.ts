﻿module egret3d {
                                
    /**
    * @private
    * @class egret3d.DepthRender
    * @classdesc
    * 深度渲染器 渲染场景中的实体对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DepthRender extends RenderBase {
                        
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
              super();
        }
                                                
        /**
        * @language zh_CN
        * 提交数据给GPU渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public draw(time: number, delay: number, context3D: Context3D, collect: CollectBase, camera: Camera3D, viewPort: Rectangle) {

            this._renderList = collect.renderList;

            this._numEntity = this._renderList.length;

            for (this._renderIndex = 0; this._renderIndex < this._numEntity; this._renderIndex++) {
                this._renderList[this._renderIndex].update(camera, time, delay);

                if (!this._renderList[this._renderIndex].isVisible) {
                    continue;
                }

                if (this._renderList[this._renderIndex].material != null) {
                    this._renderList[this._renderIndex].material.renderDepthPass(context3D, camera, this._renderList[this._renderIndex].modelMatrix, this._renderList[this._renderIndex].geometry, this._renderList[this._renderIndex].animation);
                }
            }
        }

    }
} 