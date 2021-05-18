import { Component, OnInit } from '@angular/core';
import ImageSprite from 'image-sprite'
import { IMAGE_URLS, PAGE_HEIGHT, PAGE_WIDTH } from 'src/assets/ts/constants';

@Component({
  selector: 'app-clouds',
  templateUrl: './clouds.component.html',
  styleUrls: ['./clouds.component.less'],
})
export class CloudsComponent implements OnInit {
  imageSprite;
  constructor() {}

  ngOnInit(): void {
    this.createImageSprite();
  }

  getCloudImages(resources) {
    return new Array(13).fill('').map((item, index) => {
      const image = new Image();
      image.src = resources[`cloud${index}`]
      return image;
    });
  }

  createImageSprite() {
    let images = this.getCloudImages(IMAGE_URLS);
    console.log(images)
    let imageSprite = new ImageSprite(document.getElementById('clouds'), {
      interval: 80,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      images: images,
    });

    this.imageSprite = imageSprite;
    imageSprite.play()  // play, by default is looping play, equals to play({ loop: true })

  }
}
