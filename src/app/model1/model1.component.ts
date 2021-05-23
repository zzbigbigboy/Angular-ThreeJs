import { Component, OnDestroy, OnInit } from '@angular/core';
import { getEarth } from '../utils/earth/earth';
import { GlbModel } from '../utils/glb';
import ThreeModel from '../utils/three';
import * as TWEEN from '@tweenjs/tween.js';
import { createCloud } from '../utils/earth/cloud';

@Component({
  selector: 'app-model1',
  templateUrl: './model1.component.html',
  styleUrls: ['./model1.component.less'],
})
export class Model1Component implements OnInit, OnDestroy {
  threeModel: ThreeModel;
  loading = false;
  timestamp = 0;
  timer = null;
  constructor() {}

  ngOnInit(): void {
    const threeModel = new ThreeModel();
    this.threeModel = threeModel;
    // const glb1 = new GlbModel(threeModel.scene, threeModel.renderer);
    const earth = getEarth(threeModel);
    const cloud = createCloud();
    threeModel.cloud = cloud;
    threeModel.scene.add(earth);
    threeModel.scene.add(cloud);
    console.log(threeModel.controls);
    let tween1 = new TWEEN.Tween(threeModel.camera.position)
      .to({ x: 0, y: 0, z: -36 }, 1600)
      .onComplete(() => {
        tween1 = null;
      })
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
    let tween2 = new TWEEN.Tween(earth.rotation)
      .to({ x: 0, y: Math.PI * -2, z: 0 }, 1600)
      .onComplete(() => {
        tween2 = null;
      })
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    this.addListen();
  }

  ngOnDestroy() {
    this.removeListen()
  }

  addListen() {
    const long_dom = document.getElementById('long_btn');
    long_dom.addEventListener('touchstart', () => {
      this.timer = setTimeout(() => {
        this.click()
      }, 800);
      this.timestamp = new Date().getTime();
      console.log(this.timestamp)
    });
    long_dom.addEventListener('touchend', () => {
      clearTimeout(this.timer);
      // console.log(new Date().getTime() - this.timestamp);
      // if (new Date().getTime() - this.timestamp) {
      //   this.click()
      // }
    });
  }

  removeListen() {
    const long_dom = document.getElementById('long_btn');
    long_dom.removeEventListener('touchstart', () => {})
    long_dom.removeEventListener('touchend', () => {})
  }

  click() {
    const target = [-20.03, 13.47, -14.61];
    const near = [-3.54, 2.38, -2.58];
    let tween1 = new TWEEN.Tween(this.threeModel.camera.position) // 移动摄像机到目标点上方
      .to(
        {
          x: target[0],
          y: target[1],
          z: target[2],
        },
        1600
      )
      .onComplete(() => {
        let tween2 = new TWEEN.Tween(this.threeModel.camera.position) // 视角下降
          .to(
            {
              x: near[0],
              y: near[1],
              z: near[2],
            },
            1200
          )
          .onComplete(() => {
            tween2 = null;
          })
          .easing(TWEEN.Easing.Cubic.Out)
          .start();
        tween1 = null;
        setTimeout(() => {
          this.loading = true;
          // setTimeout(() => {
          //   this.resetEarth(target);
          // }, 10*1000);
        }, 600);
      })
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  resetEarth(target) {
    this.loading = false;
    let tween1 = new TWEEN.Tween(this.threeModel.camera.position) // 返回太空
      .to(
        {
          x: target[0],
          y: target[1],
          z: target[2],
        },
        1000
      )
      .onComplete(() => {
        tween1 = null;
      })
      .start();
  }
}
