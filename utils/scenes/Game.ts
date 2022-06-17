import Phaser from 'phaser';
import Player from '../objects/Player';

export default class Game extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('player', '/assets/player.png');
  }

  create() {
    const player = new Player(this, 200, 200);
    this.add.existing(player);
  }
}
