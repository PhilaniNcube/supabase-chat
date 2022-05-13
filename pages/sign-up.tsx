import { Auth, Button, Input } from '@supabase/ui';
import React, { FormEvent } from 'react'
import supabase from '../utils/supabase';

const SignUp = () => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {email, password, username} = Object.fromEntries(new FormData(e.currentTarget))
    
    console.log({ email, password, username })

    if (typeof username === 'string' && typeof password === 'string' && typeof email === 'string') {
    
      await supabase.auth.signUp({email, password}, {data: {username}})
  }
    

}

    return (
    <div className="max-w-lg mx-auto px-6 h-screen flex items-center">
            <form onSubmit={handleSubmit} className="w-full mx-auto">
            <div className="flex flex-col space-y-6">
               
            <Input label="Email" name="email" type="email"  />    
            <Input label="Username" name="username" type="username"  />    
            <Input label="Password" name="password" type="password" />    
            <Button type="primary"  htmlType="submit" >Sign Up</Button>
            </div>
            
            </form>
                     
    </div>
 
  )
}

export default SignUp