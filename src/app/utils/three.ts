import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class ThreeModel {
  public renderer; // renderer
  public scene; // 场景
  public camera; // 相机
  public controls; // 控制器
  /* */
  public autoRotate = true;
  public rotationSpeed = 0.001;
  public cloudSpeed = -0.0003;
  constructor() {
    this.initScene();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.createCamera();
    this.createRenderer();
    this.createControls();
    this.createGeometry();
    this.createLight();
    this.initAnimate();
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true, // 是否透明
      antialias: true // 抗锯齿
    });
    this.renderer.autoClear = false;
    // 设置窗口尺寸
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model1').appendChild(this.renderer.domElement);
  }

  createCamera() {
    const _this = this;
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // 设置相机位置
    // this.camera.position.set(0, 0, -28)
    this.camera.position.set(3.55, 0, -328)
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
    //添加环境光
    // var ambient = new THREE.AmbientLight(0xffffff);
    // const hemisphere = new THREE.HemisphereLight('#ffffff', '#ffffff', 1)
    this.scene.add(new THREE.AmbientLight(0x393939, 0.5));

    let spotLight = new THREE.SpotLight(0xffffff, 1.2)
    spotLight.position.set(-26, 11, -11)
    spotLight.angle = 0.2
    spotLight.castShadow = false
    spotLight.penumbra = 0.4
    spotLight.distance = 124
    spotLight.decay = 1
    spotLight.shadow.camera.near = 50
    spotLight.shadow.camera.far = 200
    spotLight.shadow.camera.fov = 35
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.mapSize.width = 1024
    this.scene.add(spotLight);

    // 添加定向光线
    // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(5, 3, 5).normalize();
    // this.scene.add(directionalLight);
  }

  initAnimate() {
    const _this = this;
    function animate() {
      requestAnimationFrame(animate);
      if (_this.autoRotate) {
        _this.camera.position.x = _this.camera.position.x * Math.cos(_this.rotationSpeed) - _this.camera.position.z * Math.sin(_this.rotationSpeed)
        _this.camera.position.z = _this.camera.position.z * Math.cos(_this.rotationSpeed) + _this.camera.position.x * Math.sin(_this.rotationSpeed)
      }
      _this.renderer.render(_this.scene, _this.camera);
      _this.controls.update();
      TWEEN.update()
    }
    animate();
  }


}
