import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export class GlbModel {
    private renderer; // renderer
    private scene; // 场景
    private camera; // 相机

    constructor (scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;
        this.initGLB();
    }

    initGLB() {
        const _this = this;
        const loader = new GLTFLoader();

        loader.load( '/assets/glbs/ifdEpJcS9L.glb', function ( gltf ) {
            gltf.scene.scale.set(10,10,10)
            console.log(gltf)
            _this.scene.add( gltf.scene );

            document.body.appendChild(_this.renderer.domElement);
        
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } ); 
    }
}