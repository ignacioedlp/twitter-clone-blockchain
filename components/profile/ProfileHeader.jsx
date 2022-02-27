import React, { useContext } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import Router, { useRouter } from 'next/router'
import { FaLessThanEqual } from 'react-icons/fa'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
  wrapper: `border-[#38444d] border-b`,
  header: `py-1 px-3 mt-2 flex items-center`,
  primary: `bg-transparent outline-none font-bold flex flex-row align-center `,
  secondary: `text-[#8899a6] text-xs`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
  coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
  profileImage: `object-cover rounded-full h-full`,
  profileImageNft: `object-cover h-full`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-white`,
}

function ProfileHeader() {
  const { currentAccount, currentUser } = useContext(TwitterContext)
  const router = useRouter()
  const [activeNav, setActiveNav] = React.useState('Tweets')

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.backButton} onClick={() => Router.push('/')}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div className={style.primary}>
            {currentUser.name}{' '}
            {currentUser.isProfileImageNft && (
              <span className={style.verified}>
                <BsFillPatchCheckFill />
              </span>
            )}
          </div>
          <div className={style.secondary}>4 Tweets</div>
        </div>
      </div>
      <div className={style.coverPhotoContainer}>
        <img
          className={style.coverPhoto}
          alt="profile"
          src={
            currentUser.coverImage
              ? currentUser.coverImage
              : 'https://image.binance.vision/uploads/6628e286df1f461a86d25314c7204525.png'
          }
        />
      </div>
      <div className={style.profileImageContainer}>
        <div
          className={
            currentUser.isProfileImageNft ? 'hex' : style.profileImageContainer
          }
        >
          <img
            className={
              currentUser.isProfileImageNft
                ? style.profileImageNft
                : style.profileImage
            }
            alt="profile"
            src={currentUser.profileImage}
          />
        </div>
      </div>
      <div className={style.details}>
        <div>
          <div className={style.primary}>
            {currentUser.name}{' '}
            {currentUser.isProfileImageNft && (
              <span className={style.verified}>
                <BsFillPatchCheckFill />
              </span>
            )}
          </div>
        </div>
        <div className={style.secondary}>
          {currentAccount && (
            <>
              <div>
                @{currentAccount.slice(0, 8)}...{currentAccount.slice(37)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={style.nav}>
        <div
          className={activeNav === 'Tweets' && style.activeNav}
          onClick={() => setActiveNav('Tweets')}
        >
          Tweets
        </div>
        <div
          className={activeNav === 'TW&RE' && style.activeNav}
          onClick={() => setActiveNav('TW&RE')}
        >
          Tweets & replies
        </div>
        <div
          className={activeNav === 'Media' && style.activeNav}
          onClick={() => setActiveNav('Media')}
        >
          Media
        </div>
        <div
          className={activeNav === 'Likes' && style.activeNav}
          onClick={() => setActiveNav('Likes')}
        >
          Likes
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
