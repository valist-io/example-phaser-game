/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Phaser from 'phaser';
import config from '../utils/config';
import Player from '../utils/objects/Player';

export interface GameProps {
  skin: string;
}

export default function Index(props: GameProps) {
  useEffect(() => {
    class Game extends Phaser.Scene {
      constructor() {
        super('GameScene');
      }
    
      preload() {
        this.load.image('player', props.skin);
      }
    
      create() {
        const player = new Player(this, 200, 200);
        this.add.existing(player);
      }
    }
  
    const loadGame = async () => {
      new Phaser.Game(
        Object.assign(config, {
          scene: [Game]
        })
      );
    };

    loadGame();
  }, []);

  return null;
}
