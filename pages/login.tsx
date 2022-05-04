import { Auth, Input } from '@supabase/ui';
import React from 'react'
import supabase from '../utils/supabase';

const Login = () => {
    return (
    <div className="max-w-lg mx-auto px-6 h-screen flex items-center">
            <form>
            <div className="flex flex-col space-y-2">
               
            <Input label="Email" name="email" type="email"  />    
            <Input label="Password" name="password" type="password"  />    
            </div>
            
            </form>
                     
    </div>
 
  )
}

export default Login