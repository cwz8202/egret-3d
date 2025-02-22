﻿module egret3d {
                            
    /**
    * @private
    * @class egret3d.SphereSky
    * @classdesc
    * default render
    * 把所有需要渲染的对象，依次进行渲染
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DefaultRender extends RenderBase {
                
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super();
        }
                                        
        /**
        * @language zh_CN
        * 把所有需要渲染的对象，依次进行渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number, delay: number, context3D: Context3D, collect: CollectBase, camera: Camera3D, viewPort: Rectangle) {
            this._renderList = collect.renderList;
            this._numEntity = this._renderList.length;

            if (collect.rootNode._sky) {
                collect.rootNode.sky.draw(context3D, camera );
            }
            else if (collect.rootNode._sphereSky) {
                collect.rootNode._sphereSky.draw(context3D, camera );
            }

            context3D.clearDepth(1);

            for (this._renderIndex = 0; this._renderIndex < this._numEntity ; this._renderIndex++){
                this._renderList[this._renderIndex].update(camera, time, delay);

                if (!this._renderList[this._renderIndex].isVisible ) {
                    continue;
                }
                if (this._renderList[this._renderIndex].tag && this._renderList[this._renderIndex].tag.clearDepth && this._renderList[this._renderIndex].tag.cleanState) {
                    this._renderList[this._renderIndex].tag.cleanState = false;
                    context3D.clearDepth(1);
                }

                if (this._renderList[this._renderIndex].material != null) {

                    if (this._renderList[this._renderIndex].material.alpha != 0) {
                        this._renderList[this._renderIndex].material.renderDiffusePass(context3D, camera , this._renderList[this._renderIndex].modelMatrix, this._renderList[this._renderIndex].geometry, this._renderList[this._renderIndex].animation);
                    }
                }
            }
        }
    }
} 

