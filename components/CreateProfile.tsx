import React from 'react'
import { useForm } from 'react-hook-form'
import axios, { AxiosRequestConfig } from 'axios'
import router, { useRouter } from 'next/router'

interface Props {}

const CreateProfile: React.FC<Props> = () => {
  const { register, handleSubmit } = useForm()

  const onSubmitForm = async (values) => {
    const config: AxiosRequestConfig = {
      url: '/api/createprofile',
      data: values,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios(config)
    if (res.status === 200) {
      router.reload()
    }
  }
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Create your profile</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5 mt-3">
        <input
          type="text"
          name="name"
          {...register('name', { required: true })}
          placeholder="Enter your name"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 px-2"
        />
        <input
          type="text"
          name="slug"
          {...register('slug', { required: true })}
          placeholder="Enter your unique profile URL"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 px-2"
        />
        <textarea
          name="bio"
          className="w-full bg-gray-100 text-gray-900 rounded-md px-2"
          placeholder="A little bit about you"
          {...register('bio', { required: true })}
          rows={4}
        />
        <input
          type="text"
          name="phone"
          {...register('phone')}
          placeholder="Enter your phone number"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 px-2"
        />
        <input
          type="text"
          name="twitter"
          {...register('twitter')}
          placeholder="Enter your twitter link"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 px-2"
        />
        <input
          type="text"
          name="facebook"
          {...register('facebook')}
          placeholder="Enter your facebook link"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 px-2"
        />
        <input
          type="text"
          name="instagram"
          {...register('instagram')}
          placeholder="Enter your instagram link"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 px-2"
        />
        <button
          type="submit"
          className="bg-indigo-700 text-white rounded-md px-4 py-2 "
        >
          Create Profile
        </button>
      </form>
    </div>
  )
}

export default CreateProfile
