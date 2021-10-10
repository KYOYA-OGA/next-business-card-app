import React from 'react'
import { Profile } from '../types'

interface Props {
  profile: Profile
}

const DisplayProfile: React.FC<Props> = ({ profile }) => {
  console.log(profile)

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p>{profile.bio}</p>
      <ul className="mt-5">
        <li>
          <span className="font-bold">Slug</span>: {profile.slug}
        </li>
        <li>
          <span className="font-bold">Email</span>: {profile.email}
        </li>
        <li>
          <span className="font-bold">Phone</span>: {profile.phone}
        </li>
        <li>
          <span className="font-bold">Twitter</span>: {profile.twitter}
        </li>
        <li>
          <span className="font-bold">Facebook</span>: {profile.facebook}
        </li>
        <li>
          <span className="font-bold">Instagram:</span> {profile.instagram}
        </li>
      </ul>
    </div>
  )
}

export default DisplayProfile
