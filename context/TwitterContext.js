import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../libs/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState()
  const [currentAccount, setCurrentAccount] = useState('')
  const [tweets, setTweets] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount && appStatus == 'connected') return
    getCurrentUserDetails(currentAccount)
    fetchTweets()
  }, [currentAccount, appStatus])

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('no-metamask')
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        createUserAccount(addressArray[0])
        setCurrentAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('not-connected')
      }
    } catch (err) {
      router.push('/')
      setAppStatus('error')
    }
  }

  const connectToWallet = async () => {
    if (!window.ethereum) return setAppStatus('no-metamask')
    try {
      setAppStatus('connecting')

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
        setAppStatus('connected')
      } else {
        router.push('/')
        setAppStatus('not-connected')
      }
    } catch (err) {
      setAppStatus('error')
    }
  }

  const getProfileImageUrl = async (imageUri, isNft) => {
    if (imageUri !== '') {
      if (isNft) {
        return `https://gateway.pinata.cloud/ipfs/${imageUri}`
      } else {
        return imageUri
      }
    } else {
      return 'https://via.placeholder.com/150'
    }
  }

  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('no-metamask')
    try {
      const userDoc = {
        _type: 'users',
        _id: userWalletAddress,
        name: 'Unnamed user',
        isProfileImageNft: false,
        profileImage:
          'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',
        walletAddress: userWalletAddress,
      }
      await client.createIfNotExists(userDoc)
    } catch (err) {
      setAppStatus('error')
      router.push('/')
    }
  }

  const fetchTweets = async () => {
    const query = `
      *[_type == "tweets"]{
        "author": author ->{name, walletAddress, profileImage, isProfileImageNft},
        "tweet": tweet,
        "timestamp": timestamp
      }|order(timestamp desc)
    `
    const sanityResponse = await client.fetch(query)

    setTweets([])

    sanityResponse.forEach(async (item) => {
      const profileImageUrl = await getProfileImageUrl(
        item.author.profileImage,
        item.author.isProfileImageNft
      )

      let newItem = {
        tweet: item.tweet,
        timestamp: item.timestamp,
        author: {
          name: item.author.name,
          walletAddress: item.author.walletAddress,
          profileImage: profileImageUrl,
          isProfileImageNft: item.author.isProfileImageNft,
        },
      }
      setTweets((prevState) => [...prevState, newItem])
    })
  }

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return
    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `
    const sanityResponse = await client.fetch(query)
    const profileImageUrl = await getProfileImageUrl(
      sanityResponse[0].profileImage,
      sanityResponse[0].isProfileImageNft
    )
    setCurrentUser({
      name: sanityResponse[0].name,
      profileImage: profileImageUrl,
      isProfileImageNft: sanityResponse[0].isProfileImageNft,
      coverImage: sanityResponse[0].coverImage,
      walletAddress: sanityResponse[0].walletAddress,
      tweets: sanityResponse[0].tweets,
    })
  }

  return (
    <TwitterContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectToWallet,
        currentUser,
        tweets,
        fetchTweets,
        getCurrentUserDetails,
      }}
    >
      {children}
    </TwitterContext.Provider>
  )
}
