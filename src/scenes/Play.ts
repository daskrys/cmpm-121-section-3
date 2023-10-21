import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;
  w?: Phaser.Input.Keyboard.Key;
  a?: Phaser.Input.Keyboard.Key;
  s?: Phaser.Input.Keyboard.Key;
  d?: Phaser.Input.Keyboard.Key;

  enemies?: Phaser.GameObjects.Shape;
  starfield?: Phaser.GameObjects.TileSprite;
  spinner?: Phaser.GameObjects.Sprite;
  
  moveBY: number = 5;
  canMove: boolean = true;
  rotationSpeed: number = Phaser.Math.PI2 / 1000; // radians per millisecond
   //spinner?: Phaser.GameObjects.Shape;

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
    this.load.image("dog", "/yoink.png");
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");
    this.w = this.#addKey("W");
    this.s = this.#addKey("S");
    this.a = this.#addKey("A");
    this.d = this.#addKey("D");

    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);

    this.spinner = this.add.sprite(50, 420, "dog").setScale(0.1);
    this.enemies = this.add.rectangle(100, 100, 50, 50,  0x40fc1b );
    //this.spinner = this.add.rectangle(100, 100, 50, 50, 0x5548d2);
  }

  movement () {
  
  /*  if (this.w!.isDown) {
      this.spinner!.y -= this.moveBY;
    } 
  */
    if (this.a!.isDown) {
      this.spinner!.x -= this.moveBY;
    }
    /*
    if (this.s!.isDown) {
      this.spinner!.y += this.moveBY;
    }
    */
    if (this.d!.isDown) {
      this.spinner!.x += this.moveBY;
    }
    
  }

  respawn () {
    //this.spinner!.x = 50;
    //this.spinner!.y = 450;
  }

  update(_timeMs: number, delta: number) {
    this.starfield!.tilePositionX -= this.moveBY;

    if (this.left!.isDown) {
      this.spinner!.rotation -= delta * this.rotationSpeed;
    }
    if (this.right!.isDown) {
      this.spinner!.rotation += delta * this.rotationSpeed;
    }
    
    if(this.canMove)
    {
      this.movement();
    }

    if (this.fire!.isDown) {
      this.canMove = false;  

      this.tweens.add({
        targets: this.spinner,
        scale: { from: .10, to: .125 },
        y: {from: this.spinner?.y, to: -50},
        duration: 400,
        ease: Phaser.Math.Easing.Sine.Out,
      });

      this.time.delayedCall(450, this.respawn);
    
    }
  }
}
