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
  constructor() {}

  ngOnInit(): void {
    const threeModel = new ThreeModel();
    // const glb1 = new GlbModel(threeModel.scene, threeModel.renderer);
    const earth = getEarth(threeModel);
    const cloud = createCloud()
    threeModel.cloud = cloud;
    threeModel.scene.add(earth)
    threeModel.scene.add(cloud)
    console.log(threeModel.controls)
    let tween1 = new TWEEN.Tween(threeModel.camera.position)
      .to({x: 0, y: 0, z: -28}, 1600)
      .onComplete(() =>{
        tween1 = null;
      })
      .easing(TWEEN.Easing.Cubic.Out).start()
      console.log(earth)
    let tween2 = new TWEEN.Tween(earth.rotation)
      .to({x: 0, y: Math.PI * -2, z: 0}, 1600)
      .onComplete(() =>{
        tween2 = null;
      })
      .easing(TWEEN.Easing.Cubic.Out).start()
  }
}
