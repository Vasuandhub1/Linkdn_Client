import React from 'react'
import Profile from '../components/Profile/profile'
import NavigationBar from '../layouts/NavigationBar'
function ProfilePage() {
  return (
    <div>
        <NavigationBar>
        <Profile/>
        </NavigationBar>
    </div>
  )
}

export default ProfilePage
