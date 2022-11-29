import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this)
    this.setCollideWorldBounds(true);

    this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.speed = 5;
  }
  
  preUpdate() {
    if (this.left.isDown) this.x -= this.speed;
    if (this.right.isDown) this.x += this.speed;
    if (this.up.isDown) this.y -= this.speed;
    if (this.down.isDown) this.y += this.speed;
  }
}

export class Game extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('player', 'assets/player.png');
  }

  create() {
    const player = new Player(this, 200, 200);
    this.add.existing(player);
  }
}

export const start = () => new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#4eb3e7',
  parent: 'game',
  physics: {
    default: 'arcade',
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Game],
});