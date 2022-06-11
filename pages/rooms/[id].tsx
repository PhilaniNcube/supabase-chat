import { Input } from '@supabase/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react'
import Messages from '../../components/Messages';
import supabase from '../../utils/supabase';

const Room: NextPage = () => {
  const router = useRouter()
  const roomId = router.query.id as string 
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const { message } = Object.fromEntries(
      new FormData(form)
    )

    if (typeof message === 'string' && message.trim().length !== 0) {
      form.reset()
      const { data, error } = await supabase.from('messages').insert({ content: message, room_id: roomId });

      if (error) {
        alert(error.message)
      }
      
      console.log({data, error})
    }

  }

  return (
    <Fragment>
      <div className="container mx-auto py-12">
        
      {roomId && 
      <Messages roomId={roomId} />
    }
          <form onSubmit={handleSubmit} className="flex w-full">
              <Input type="text" name="message" className="w-full" />
          </form>
    </div>
    </Fragment>
  )
}

export default Room