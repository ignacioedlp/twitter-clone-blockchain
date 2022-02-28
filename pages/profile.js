import React from 'react'
import {
  Widgets,
  Sidebar,
  ProfileTweets,
  ProfileHeader,
} from '../components/index'

const style = {
  wrapper:
    'flex  h-screen w-screen select-none bg-[#15202b] text-white  justify-center py-2',
  content: ' flex flex-col md:flex-row justify-between h-screen bg-[#15202b]',
  mainContent: `flex-[2] border-r border-l border-[#38444d] bg-[#15202b]  `,
}

function Profile() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar />
        <div className={style.mainContent}>
          <ProfileHeader />
          <ProfileTweets />
        </div>
        <Widgets />
      </div>
    </div>
  )
}

export default Profile
