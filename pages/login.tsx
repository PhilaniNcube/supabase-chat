import { Auth, Button, Input } from '@supabase/ui'
import React, { FormEvent } from 'react'
import {useRouter } from 'next/router'
import supabase from '../utils/supabase'

const Login = () => {

const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = Object.fromEntries(
      new FormData(e.currentTarget)
    )

    console.log({ email, password })

    if (typeof password === 'string' && typeof email === 'string') {
      const { error } = await supabase.auth.signIn({ email, password })
      
      console.log(error)

      if (error) {
        alert(error.message)
        return
      }

      router.push('/')
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-lg items-center px-6">
      <form onSubmit={handleSubmit} className="mx-auto w-full">
        <div className="flex flex-col space-y-6">
          <Input label="Email" name="email" type="email" />

          <Input label="Password" name="password" type="password" />
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
