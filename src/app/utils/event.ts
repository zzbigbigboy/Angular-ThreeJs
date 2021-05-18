import * as THREE from 'three';

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

export function onMouseClick(event, scene, camera) {

    //将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = (event.clientY / window.innerHeight) * 2 + 1

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera(mouse, camera);

    // 获取raycaster直线和所有模型相交的数组集合
    var intersects = raycaster.intersectObjects(scene.children);
    // console.log(intersects);

    //将所有的相交的模型的颜色设置为红色
    for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
    }
}