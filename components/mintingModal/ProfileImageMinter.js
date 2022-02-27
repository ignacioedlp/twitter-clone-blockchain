import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import InitialState from './InitialState'
import FinishedState from './FinishedState'
import LoadingState from './LoadingState'
import { TwitterContext } from '../../context/TwitterContext'
import { pinJSONToIPFS, pinFileToIPFS } from '../../libs/pinata'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../../libs/constants'
import { client } from '../../libs/client'

// let metamask

// if (typeof window !== 'undefined') {
//   metamask = window.ethereum
// }

// const getEthereumContract = () => {
//   const provider = new ethers.providers.Web3Provider(metamask)
//   const signer = provider.getSigner()
//   const transactionContract = new ethers.Contract(
//     contractAddress,
//     contractABI,
//     signer
//   )

//   return transactionContract
// }

function ProfileImageMinter() {
  const router = useRouter()
  const { currentAccount, setAppStatus } = useContext(TwitterContext)
  const [status, setStatus] = useState('initial')
  const [profileImage, setProfileImage] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const mint = async () => {
    if (!name || !description || !profileImage) return
    setStatus('loading')

    const pinataMetaData = {
      name: `${name} - ${description}`,
    }
    const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData)
    await client
      .patch(currentAccount)
      .set({ profileImage: ipfsImageHash })
      .set({ isProfileImageNft: true })
      .set({ name })
      .commit()

    const imageMetaData = {
      name: name,
      description: description,
      image: `ipfs://${ipfsImageHash}`,
    }
    const ipfsJsonHash = await pinJSONToIPFS(imageMetaData)

    // const contract = await getEthereumContract()

    // const transactionParameters = {
    //   to: contractAddress,
    //   from: currentAccount,
    //   data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
    // }

    // await metamask.request({
    //   method: 'eth_sendTransaction',
    //   params: [transactionParameters],
    // })

    // try {
    //   await metamask.request({
    //     method: 'eth_sendTransaction',
    //     params: [transactionParameters],
    //   })

    //   setStatus('finished')
    // } catch (error) {
    //   console.log(error)
    //   setStatus('finished')
    // }
    setStatus('finished')
  }

  const modalChildren = (modalStatus = status) => {
    switch (modalStatus) {
      case 'initial':
        return (
          <InitialState
            setStatus={setStatus}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            name={name}
            setName={setName}
            setDescription={setDescription}
            description={description}
            mint={mint}
          />
        )
      case 'finished':
        return <FinishedState />
      case 'loading':
        return <LoadingState />
      default:
        router.push('/')
        setAppStatus('error')
        break
    }
  }

  return <>{modalChildren(status)}</>
}

export default ProfileImageMinter
