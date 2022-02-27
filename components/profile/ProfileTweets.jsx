import React, { useContext } from 'react'
import Post from '../home/Post'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
  wrapper: `no-scrollbar overflow-y-hidden`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

function ProfileTweets() {
  const { currentUser } = useContext(TwitterContext)
  return (
    <div className={style.wrapper}>
      {currentUser.tweets?.map((tweet, index) => (
        <Post
          displayName={
            currentUser.name === 'Unnamed'
              ? `${currentUser.walletAddress.slice(
                  0,
                  4
                )}...${currentUser.walletAddress.slice(0, 4)}`
              : currentUser.name
          }
          userName={`${currentUser.walletAddress.slice(
            0,
            4
          )}...${currentUser.walletAddress.slice(0, 4)}`}
          text={tweet.tweet}
          avatar={currentUser.profileImage}
          isProfileImageNft={currentUser.isProfileImageNft}
          timestamp={tweet.timestamp}
          key={index}
        />
      ))}
    </div>
  )
}

export default ProfileTweets
