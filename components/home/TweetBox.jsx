import React, { useState } from 'react'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import { useContext } from 'react'
import { client } from '../../libs/client'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
}

function TweetBox() {
  const [tweet, setTweet] = useState('')
  const { currentAccount, fetchTweets, currentUser } =
    useContext(TwitterContext)

  const handleChange = (e) => {
    setTweet(e.target.value)
  }

  const postTweet = async (e) => {
    e.preventDefault()
    if (!tweet) return
    const tweetId = `${currentAccount}_${Date.now()}`
    const tweetDoc = {
      _type: 'tweets',
      _id: tweetId,
      timestamp: new Date(Date.now()).toISOString(),
      tweet: tweet,
      author: {
        _type: 'reference',
        _ref: currentAccount,
        _key: tweetId,
      },
    }
    await client.createIfNotExists(tweetDoc)

    await client
      .patch(currentAccount)
      .setIfMissing({ tweets: [] })
      .insert('after', 'tweets[-1]', [
        {
          _key: tweetId,
          _ref: tweetId,
          _type: 'reference',
        },
      ])
      .commit()
    fetchTweets()
    setTweet('')
  }

  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img
          className={
            currentUser.isProfileImageNft
              ? `${style.profileImage} smallHex`
              : style.profileImage
          }
          alt="profile"
          src={currentUser.profileImage}
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form>
          <textarea
            className={style.inputField}
            placeholder="What's happening?"
            onChange={(e) => handleChange(e)}
            value={tweet}
          />
          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
              <RiFileGifLine className={style.icon} />
              <BsCardImage className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              className={`${style.submitGeneral} ${
                tweet ? style.activeSubmit : style.inactiveSubmit
              }`}
              type="submit"
              disabled={!tweet}
              onClick={(e) => postTweet(e)}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox
