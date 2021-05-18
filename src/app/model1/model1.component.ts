import { Component, OnInit } from '@angular/core';
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
export class Model1Component implements OnInit {
  threeModel: ThreeModel;
  loading = false;
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
  }

  click() {
    const target = [-20.03, 13.47, -14.61];
    const near = [-3.54, 2.38, -2.58];
    let tween1 = new TWEEN.Tween(this.threeModel.camera.position)
      .to(
        {
          x: target[0],
          y: target[1],
          z: target[2],
        },
        1200
      )
      .onComplete(() => {
        let tween2 = new TWEEN.Tween(this.threeModel.camera.position)
          .to(
            {
              x: near[0],
              y: near[1],
              z: near[2],
            },
            800
          )
          .onComplete(() => {
            tween2 = null;
            console.log('1111111111111');
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.resetEarth(target);
            }, 2000);
          })
          .easing(TWEEN.Easing.Cubic.Out)
          .start();
        tween1 = null;
      })
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  resetEarth(target) {
    let tween1 = new TWEEN.Tween(this.threeModel.camera.position)
      .to(
        {
          x: target[0],
          y: target[1],
          z: target[2],
        },
        800
      )
      .onComplete(() => {
        tween1 = null;
      })
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }
}
