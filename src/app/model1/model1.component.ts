import { Component, OnInit } from '@angular/core';
import { GlbModel } from '../utils/glb';
import { ThreeModel } from '../utils/three';

@Component({
  selector: 'app-model1',
  templateUrl: './model1.component.html',
  styleUrls: ['./model1.component.less'],
})
export class Model1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const threeModel = new ThreeModel();
    const glb1 = new GlbModel(threeModel.scene, threeModel.renderer);
  }
}
