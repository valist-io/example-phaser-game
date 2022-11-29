import styles from '../styles/Home.module.css'

import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createReadOnly, generateID } from '@valist/sdk';
import { useEffect, useState } from 'react';
import { useAccount, useProvider } from 'wagmi';

const Home: NextPage = () => {
  const provider = useProvider()
  const { address } = useAccount();

  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  // generate the project ID
  const accountID = generateID('137', 'webgame');
  const projectID = generateID(accountID, 'game');

  // create valist sdk client
  const valist = createReadOnly(provider as any, { chainId: 137 });

  useEffect(() => {
    // reset the balance when address changes
    setBalance(0);

    if (address) {
      // check the current user's product balance
      valist.getProductBalance(address, projectID).then(val => setBalance(val.toNumber()));
    }
  }, [address]);

  const play = async () => {
    setPlaying(true);
    // dynamically load the game
    import('../utils/game').then(game => game.start());  
  };

  return (
    <div>
      <div style={{position: 'fixed', top: 20, right: 20, zIndex: 10}}>
        <ConnectButton />
      </div>
      {!isPlaying && 
        <div className={styles.menu}>
          <h1>Welcome to the Web3 Game!</h1>
          <div>
            <button onClick={play} style={{ marginRight: 10 }} disabled={balance <= 0}>
              Play { balance <= 0 ? '(No token found)' : '' }
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
