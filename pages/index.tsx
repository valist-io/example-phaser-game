import Head from 'next/head'
import { useEffect } from 'react';
import dynamic from 'next/dynamic'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { createReadOnly, generateID } from '@valist/sdk';
import { ethers } from 'ethers';

const CreateGame = dynamic(() => import('components/CreateGame'),
  { ssr: false }
);

const Home = () => {
  const { data, isError, isLoading } = useAccount();
  const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');
  const valist = createReadOnly(provider, { chainId: 137 });

  useEffect(() => { 
    if (data?.address) console.log('address', data?.address); 
  }, [data?.address]);

  useEffect(() => {
    (async () => {
      if (data?.address) {
        const accountID = generateID('137', 'acme-co');
        const projectID = generateID(accountID, 'token-gated-unity-3');
        const productBalance = await valist.getProductBalance(data?.address, projectID);
        console.log('Balance', Number(productBalance._hex));
      }
    })();
  }, [valist, data?.address]);

  return (
    <div>
      <Head>
        <title>Web3 Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{position: 'fixed', top: 20, right: 20}}>
        <ConnectButton />
      </div>
      <div id="game"></div>
      <CreateGame />
    </div>
  );
};

export default Home;
