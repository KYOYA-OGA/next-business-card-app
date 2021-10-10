import Head from 'next/head'
import { signIn, signOut, getSession } from 'next-auth/client'
import { PrismaClient } from '@prisma/client'
import CreateProfile from '../components/CreateProfile'
import DisplayProfile from '../components/DisplayProfile'
import { useState } from 'react'
import EditProfile from '../components/EditProfile'

export default function Home({ session, profile }) {
  const [editing, setEditing] = useState<Boolean>(false)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Business Card Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            <div className="flex items-center space-x-5">
              <p>
                Signed in as{' '}
                <span className="font-bold">{session.user.email}</span>
              </p>
              <button
                onClick={() => signOut()}
                className="bg-indigo-100 text-black rounded-md px-4 py-2 hover:bg-indigo-300 transition-colors"
              >
                Sign out
              </button>
            </div>
            {!profile && <CreateProfile />}
            {profile && !editing && (
              <>
                <DisplayProfile profile={profile} />
                <button
                  className="mt-5 transition-colors bg-indigo-700 text-white rounded-md px-4 py-2 hover:bg-indigo-900"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              </>
            )}
            {profile && editing && (
              <EditProfile profile={profile} setEditing={setEditing} />
            )}
          </>
        )}
      </>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  const prisma = new PrismaClient()

  if (!session) {
    return {
      props: {
        session: null,
      },
    }
  }

  const profile = await prisma.profile.findUnique({
    where: {
      email: session.user.email,
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
    },
  })

  return {
    props: {
      session,
      profile,
    },
  }
}
