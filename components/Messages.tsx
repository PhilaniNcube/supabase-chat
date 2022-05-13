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
    profile_id:  String
}

const Messages: NextPage = () => {

const [messages, setMessages] = useState<Message[]>([])

useEffect(() => {
  
    const getData = async () => {
        const { data } = await supabase.from<Message>('messages').select('*').order('created_at' , {ascending: true})
        if (!data) {
            alert('No messages')
            return
        }
        setMessages(data)
    }

getData()

}, [])
    
    
    useEffect(() => {
       const subscription = supabase.from<Message>('messages').on('INSERT', (payload) => {
         
           setMessages((current) => [...current, payload.new]  )
       }).subscribe()
        
        return () => {
            supabase.removeSubscription(subscription)
        }
    }, [])
    
    const userId = supabase.auth.user()?.id


  return (
      <ul className="p-2 flex flex-col space-y-2 overflow-y-scroll max-h-[75vh]">
          {messages.map((message) => {
              return <li className={message.profile_id === userId ? 'px-3 py-1 self-end bg-sky-200 rounded-md' : 'px-3 py-1 bg-slate-100 self-start  rounded-md'} key={message.id}>
                  
                  <small className="text-base text-gray-700">{message.content }</small>
                  </li>
          })}
    </ul>
  )
}

export default Messages