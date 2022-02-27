import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import Link from 'next/link'
import ProfileImageMinter from '../mintingModal/ProfileImageMinter'
import { customStyle } from '../../libs/constants'
//icons
import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill,
} from 'react-icons/bs'
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { FiBell, FiMoreHorizontal } from 'react-icons/fi'
import { HiOutlineMail, HiMail } from 'react-icons/hi'
import { FaRegListAlt, FaHashtag, FaBell } from 'react-icons/fa'
import { CgMoreO } from 'react-icons/cg'
import { VscTwitter } from 'react-icons/vsc'
import Modal from 'react-modal'
import SidebarOptions from './SidebarOptions'

//styles
const style = {
  wrapper: `flex-[0.7] px-8 flex flex-col bg-[#15202b] md:my-0 my-2`,
  twitterIconContainer: `text-3xl m-4`,
  tweetButton: `bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
  navContainer: `flex-1`,
  profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2`,
  profileLeft: `flex item-center justify-center mr-4`,
  profileImage: `height-12 w-12 rounded-full`,
  profileRight: `flex-1 flex`,
  details: `flex-1`,
  name: `text-lg`,
  handle: `text-[#8899a6]`,
  moreContainer: `flex items-center mr-2`,
}

function Sidebar({ initialSelectedIcon = 'Home' }) {
  const [selected, setSelected] = useState(initialSelectedIcon)
  const { currentAccount, currentUser } = useContext(TwitterContext)
  const router = useRouter()

  return (
    <div className={style.wrapper}>
      <div className={style.twitterIconContainer}>
        <VscTwitter />
      </div>
      <div className={style.navContainer}>
        <SidebarOptions
          Icon={selected === 'Home' ? RiHome7Fill : RiHome7Line}
          text="Home"
          isActive={selected === 'Home'}
          setSelected={setSelected}
          redirect={'/'}
        />
        <SidebarOptions
          Icon={selected === 'Explore' ? FaHashtag : BiHash}
          text="Explore"
          isActive={selected === 'Explore'}
          setSelected={setSelected}
          redirect={'/explore'}
        />
        <SidebarOptions
          Icon={selected === 'Notifications' ? FaBell : FiBell}
          text="Notifications"
          isActive={selected === 'Notifications'}
          setSelected={setSelected}
          redirect={'/notifications'}
        />
        <SidebarOptions
          Icon={selected === 'Messages' ? HiMail : HiOutlineMail}
          text="Messages"
          isActive={selected === 'Messages'}
          setSelected={setSelected}
          redirect={'/messages'}
        />
        <SidebarOptions
          Icon={selected === 'Bookmarks' ? BsBookmarkFill : BsBookmark}
          text="Bookmarks"
          isActive={selected === 'Bookmarks'}
          setSelected={setSelected}
          redirect={'/bookmarks'}
        />
        <SidebarOptions
          Icon={selected === 'Lists' ? RiFileList2Fill : FaRegListAlt}
          text="Lists"
          isActive={selected === 'Lists'}
          setSelected={setSelected}
          redirect={'/lists'}
        />
        <SidebarOptions
          Icon={selected === 'Profile' ? BsPersonFill : BsPerson}
          text="Profile"
          isActive={selected === 'Profile'}
          setSelected={setSelected}
          redirect={'/profile'}
        />
        <SidebarOptions
          Icon={selected === 'More' ? CgMoreO : FiMoreHorizontal}
          text="More"
          isActive={selected === 'More'}
          setSelected={setSelected}
          redirect={'/more'}
        />
        <div
          className={style.tweetButton}
          onClick={() =>
            router.push(`${router.pathname}/?mint=${currentAccount}`)
          }
        >
          Mint
        </div>
      </div>
      <div className={style.profileButton}>
        <div className={style.profileLeft}>
          <img
            src={currentUser.profileImage}
            alt="profile"
            className={
              currentUser.isProfileImageNft
                ? `${style.profileImage} smallHex`
                : style.profileImage
            }
          />
        </div>
        <div className={style.profileRight}>
          <div className={style.details}>
            <div className={style.name}>{currentUser.name}</div>
            <div className={style.handle}>
              {currentAccount.slice(0, 4)}...{currentAccount.slice(32)}
            </div>
          </div>
          <div className={style.moreContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
      <Modal
        isOpen={Boolean(router.query.mint)}
        onRequestClose={() => router.back()}
        style={{ customStyle }}
      >
        <ProfileImageMinter />
      </Modal>
    </div>
  )
}

export default Sidebar
