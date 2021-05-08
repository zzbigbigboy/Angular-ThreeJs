import { getTexture } from 'src/assets/ts/utils'
import { SpriteMaterial, Sprite } from 'three'

export function createLocationSprite (location) {
  let spriteMaterial = new SpriteMaterial({
    map: getTexture(location.imageName),
    color: 0xffffff,
    fog: true
  })
  let sprite = new Sprite(spriteMaterial)
  sprite.position.set(location.position[0], location.position[1], location.position[2])
  sprite.scale.set(1.4, 1.4, 1.4)
  return sprite
}
