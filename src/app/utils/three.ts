import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createAmbientLight, createSpotLight } from './earth/light';
import { LOCATIONS } from 'src/assets/ts/constants';
import { createLocationSprite } from './earth/locations';
import { onMouseClick } from './event';

export default class ThreeModel {
  public renderer; // renderer
  public scene; // 场景
  public camera; // 相机
  public controls; // 控制器
  public locationGroup;
  public earthGroup;
  /* */
  public autoRotate = true;
  public rotationSpeed = 0.001;
  public cloudSpeed = -0.0003;
  public spotLight;
  public cloud;

  public width = window.innerWidth * 2;
  public height = window.innerHeight * 2;
  constructor() {
    this.init();
  }

  init() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createControls();
    this.createGeometry();
    this.createLight();

    this.createLocations()

    this.loop();

    this.addEventListen()
  }

  addEventListen() {
    const _this = this;
    window.addEventListener( 'click', (e) => onMouseClick(e, _this.scene, _this.camera), false );
  }

  removeEventListen() {
    const _this = this;
    window.removeEventListener( 'click', (e) => onMouseClick(e, _this.scene, _this.camera), false );
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.earthGroup = new THREE.Group()
    this.locationGroup = new THREE.Group()

    this.scene.add(this.earthGroup);
    this.scene.add(this.locationGroup);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true, // 是否透明
      antialias: true // 抗锯齿
    });
    this.renderer.autoClear = false;
    // 设置窗口尺寸
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.style.position = 'relative'
    this.renderer.domElement.style.width = this.width / 2 + 'px'
    this.renderer.domElement.style.height = this.height / 2 + 'px'
    document.getElementById('model1').appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      40,
      this.width / this.height,
      0.1,
      1000
    );
    // 设置相机位置
    // this.camera.position.set(0, 0, -28)
    this.camera.position.set(3.55, 0, -328)
    
    this.scene.add(this.camera)
  }

  createControls() {
    // 初始化控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
    this.controls.rotateSpeed = 0.3
    this.controls.autoRotate = false
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.enabled = true
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    // this.controls.enableDamping = true;
    // 禁止相机平移
    // this.controls.enablePan = false;
    // 禁止相机缩放
    // this.controls.enableZoom = false;
  }

  createGeometry() {
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);

    // this.camera.position.z = 3;
  }

  createLight() {
    this.scene.add(createAmbientLight());
    this.camera.add(createSpotLight());

    //添加环境光
    // var ambient = new THREE.AmbientLight(0xffffff);
    // const hemisphere = new THREE.HemisphereLight('#ffffff', '#ffffff', 1)

    // 添加定向光线
    // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(5, 3, 5).normalize();
    // this.scene.add(directionalLight);
  }

  createLocations () {
    LOCATIONS.forEach(location => {
      let sprite = createLocationSprite(location)
      this.locationGroup.add(sprite)
    })
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this))
    this.animate()
    this.render()
  }

  animate() {
    const _this = this;
    if (_this.autoRotate) {
      _this.camera.position.x = _this.camera.position.x * Math.cos(_this.rotationSpeed) - _this.camera.position.z * Math.sin(_this.rotationSpeed)
      _this.camera.position.z = _this.camera.position.z * Math.cos(_this.rotationSpeed) + _this.camera.position.x * Math.sin(_this.rotationSpeed)
    }
    if(_this.cloud) {
      _this.cloud.rotation.y += _this.cloudSpeed
    }
    _this.controls.update();
    TWEEN.update()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }


}
