import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Profile } from '../../types'

interface Props {
  profile: Profile
}

const ProfilePage: React.FC<Props> = ({ profile }) => {
  console.log(profile)

  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p>{profile.bio}</p>
      <Image
        src={profile.user.image}
        width={100}
        height={100}
        alt={profile.name}
      />
      <ul className="mt-5">
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

export default ProfilePage

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prisma = new PrismaClient()

  const profile = await prisma.profile.findFirst({
    where: {
      slug: params.slug,
    },
    select: {
      email: true,
      facebook: true,
      instagram: true,
      slug: true,
      twitter: true,
      phone: true,
      name: true,
      bio: true,
      user: { select: { image: true } },
    },
  })
  return {
    props: {
      profile,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}
