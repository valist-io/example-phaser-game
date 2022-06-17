import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { connectorsForWallets, RainbowKitProvider, wallet } from '@rainbow-me/rainbowkit'

function App({ Component, pageProps }: AppProps) {
  const defaultProvider = jsonRpcProvider({
    rpc: () => ({
      http: 'https://polygon-rpc.com',
    }),
  });

  const { chains, provider } = configureChains([chain.polygon], [defaultProvider]);
  const connectors = connectorsForWallets([
    {
      groupName: 'Popular',
      wallets: [
        wallet.coinbase({ appName: 'Valist', chains }),
        wallet.metaMask({ chains }),
      ],
    },
    {
      groupName: 'Mobile',
      wallets: [
        wallet.rainbow({ chains }),
        wallet.walletConnect({ chains }),
      ],
    },
  ]);
  const wagmiClient = createClient({ autoConnect: true, connectors, provider });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App;