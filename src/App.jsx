import React, {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
  'https://media1.tenor.com/m/U-g_SmVeq40AAAAC/poodle-dancing-dog-poodle.gif',
  'https://media1.tenor.com/m/RUGGdovmONkAAAAd/dance-dancing.gif',
  'https://media1.tenor.com/m/_qP4QstG3kAAAAAC/star-wars-day-grogu.gif',
'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGZoNGgzbXlrc2Q1aDZtdnhmeTVtNnBnbjE4d3J0anV2OGdsejVqbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0Cyhi8GCSU91PvtC/giphy.gif'
   ]

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [inputValue, setInputValue] = useState('')
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

  const sendGif = async() => {
    if (inputValue.length > 0) {
      console.log('gif link:', inputValue)
    } else {
      console.log('Empty input. Try again.')
    }
  }
  const onInputChange = event => {
    const {value} = event.target;
    setInputValue(value)
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
        <form
          onSubmit={event => {
            event.preventDefault()
            sendGif()
          }}>
          <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange} />
          <button type="submit" className="cta-button submit-gif-button">Submit</button>

        </form>

        
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
