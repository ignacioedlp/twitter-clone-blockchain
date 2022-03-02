import { Sidebar, Feed, Widgets, Menu } from '../components/index'
import { TwitterContext } from '../context/TwitterContext'
import { useContext } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import metamaskLogo from '../assets/metamask.png'
import errorLogo from '../assets/error.png'

const style = {
  wrapper:
    'flex h-screen w-screen select-none bg-[#15202b] text-white flex-col  justify-center ',
  content: ' flex flex-col md:flex-row justify-between h-screen bg-[#15202b]',
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}

const Home = () => {
  const { connectToWallet, appStatus } = useContext(TwitterContext)

  const app = (status = appStatus) => {
    switch (status) {
      case 'connected':
        return userLoggedIn
      case 'not-connected':
        return noUserFound
      case 'error':
        return error
      case 'no-metamask':
        return noMetaMaskFound
      default:
        return loading
    }
  }

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar initialSelectedIcon={'Home'} />
      <Feed />
      <Widgets />
    </div>
  )

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div
        className={style.walletConnectButton}
        onClick={() => connectToWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Metamask.</div>
    </div>
  )

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div className={style.loginContent}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://metamask.io/download.html`}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet, in your
          browser.
        </a>
      </div>
    </div>
  )

  const error = (
    <div className={style.loginContainer}>
      <Image src={errorLogo} width={250} height={200} />
      <div className={style.loginContent}>
        An error occurred. Please try again later or from another browser.
      </div>
    </div>
  )

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>Loading...</div>
    </div>
  )

  return (
    <div>
    <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main  className={style.wrapper}>
      {app(appStatus)}
    </main>
   </div>
 )
}

export default Home
