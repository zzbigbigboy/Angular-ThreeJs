import * as THREE from 'three';
import ThreeModel from '../three';
import { getTexture } from '../../../assets/ts/utils';

export function getEarth(threeModel: ThreeModel) {
    // 定义地球材质
    // var earthTexture = THREE.ImageUtils.loadTexture("assets/images/earth4.jpg", {}, function () {
    //     threeModel.renderer.render(threeModel.scene, threeModel.camera);
    // });
    // 创建地球
    const earthBall = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32), 
        // new THREE.MeshBasicMaterial({
        //     map: earthTexture
        // }),
        new THREE.MeshPhongMaterial({
            map: getTexture('earth'),
            bumpMap: getTexture('earthBump'),
            bumpScale: 0.15,
            specularMap: getTexture('earthSpec'),
            specular: new THREE.Color('#909090'),
            shininess: 5,
            transparent: true
          })
    );
    earthBall.layers.set(0);
    console.log(earthBall)
    return earthBall;
}