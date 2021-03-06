import React, { useContext } from 'react'
import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'
import Post from './Post'

import { TwitterContext } from '../../context/TwitterContext'

const style = {
  wrapper: `flex-[2] md:border-r md:border-l border-[#38444d] bg-[#15202b] `,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

function Feed() {
  const { tweets, currentAccount } = useContext(TwitterContext)

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Feed</div>
        <BsStars />
      </div>
      <TweetBox />
      <div class="max-h-[650px] w-full overflow-auto scrollbar-hide">
        {tweets.map((tweet, index) => (
          <Post
            displayName={
              tweet.author.name === 'Unnamed'
                ? `${tweet.author.walletAddress.slice(
                    0,
                    4
                  )}...${tweet.author.walletAddress.slice(0, 4)}`
                : tweet.author.name
            }
            userName={`${tweet.author.walletAddress.slice(
              0,
              4
            )}...${tweet.author.walletAddress.slice(0, 4)}`}
            text={tweet.tweet}
            avatar={tweet.author.profileImage}
            isProfileImageNft={tweet.author.isProfileImageNft}
            timestamp={tweet.timestamp}
            key={index}
            likes={tweet.likes}
            id={tweet.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
