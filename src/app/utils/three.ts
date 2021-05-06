import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class ThreeModel {
  public renderer; // renderer
  public scene; // 场景
  public camera; // 相机
  public controls; // 控制器
  /* */
  constructor() {
    this.initScene();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model1').appendChild(this.renderer.domElement);
    
    this.createControls();
    this.createGeometry();
    this.createLight();
    this.initAnimate();
  }

  createControls () {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
  }

  createGeometry() {
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);

    this.camera.position.z = 3;
  }

  createLight() {
    //添加环境光
    var ambient = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambient);

    // 添加定向光线
    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    this.scene.add(directionalLight);
  }

  initAnimate() {
    const _this = this;
    function animate() {
      requestAnimationFrame(animate);
      _this.renderer.render(_this.scene, _this.camera);
    }
    animate();
  }

  
}
