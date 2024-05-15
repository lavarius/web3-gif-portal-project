import React, {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
  'https://tenor.com/view/poodle-dancing-dog-poodle-dancing-dog-nokka-gif-6046152088505723789',
  'https://tenor.com/view/dance-dancing-dancing-cat-cat-cat-dance-gif-4990417705814603993',
  'https://tenor.com/view/star-wars-day-grogu-may-the-4th-be-with-you-may-4th-may-the-fourth-be-with-you-gif-18348782272599481920',
  'https://giphy.com/gifs/xT0Cyhi8GCSU91PvtC'
   ]

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const checkIfWalletIsConnected = async() => {
    try {
      const {solana} = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!')

          const response = await solana.connect({onlyIfTrusted: true})
          console.log('Connected with Public Key:', response.publicKey.toString())
          setWalletAddress(response.publicKey.toString())
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻')
      }
    } catch(error) {
      console.error(error)
    }
  }

  const connectWallet = async() => {
    const {solana} = window;
    if (solana) {
      const response = await solana.connect()
      console.log('Connected with Public Key:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}>
      Connect to Wallet
    </button>
  )

  const renderConnectedContainer = () => (
      <div className="connected-container">
        <div className='gif-grid'>
          {TEST_GIFS.map(gif => (
            <div className='gif-item' key={gif}>
              <img src={gif} alt={gif} />
            </div>
          ))}
            
        </div>
      </div>
  )
  
  useEffect(() => {
    const onLoad = async() => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad)
  }, [])
  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Adapted from @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
