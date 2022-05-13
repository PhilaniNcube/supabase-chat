import React, {useEffect, useState} from 'react'
import type { NextPage } from 'next'
import supabase from '../utils/supabase';



type Profile = {
    id: string
    username: string
}

type Message = {
    id: string,
    created_at: string,
    content: string,
    profile_id: {
        id: String
        username: String
    }
}

const Messages: NextPage = () => {

    const [messages, setMessages] = useState<Message[]>([])
    
        const getData = async () => {
            const { data } = await supabase.from<Message>('messages').select('*, profile_id(id, username)').order('created_at', { ascending: true })
            
            console.log(data)
        if (!data) {
            alert('No messages')
            return
        }
        setMessages(data)
    }

    useEffect(() => {
            getData()
        }, [])
  



    
    
    useEffect(() => {
       const subscription = supabase.from<Message>('messages').on('INSERT', (payload) => {
         
          getData()
       }).subscribe()
        
        return () => {
            supabase.removeSubscription(subscription)
        }
    }, [])
    
    const userId = supabase.auth.user()?.id


  return (
      <ul className="p-2 flex flex-col space-y-4 overflow-y-scroll max-h-[75vh]">
          {messages.map((message) => {
              return <li className={message.profile_id.id === userId ? 'px-3 py-1 self-end bg-sky-200 rounded-md max-w-[80%] shadow' : 'shadow px-3 py-1 bg-slate-100 self-start  rounded-md'} key={message.id}>

                  <small className="text-base text-gray-700 flex flex-col">
                      <span className="text-xs font-medium text-gray-500">{message.profile_id.username}</span>
                      <span >{message.content}</span>
                  </small>
                  
                  </li>
          })}
    </ul>
  )
}

export default Messages