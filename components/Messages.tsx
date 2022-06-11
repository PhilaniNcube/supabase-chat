import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import supabase from '../utils/supabase'

type Profile = {
  id: string
  username: string
}

type Message = {
  id: string
  created_at: string
  content: string
  profile_id: string
  profile: {
    id: string
    username: string
  }
}

type MessagesProps = {
  roomId: string
}

let profileCache = {

} as any

const Messages = ({ roomId }: MessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const messagesRef = useRef<HTMLUListElement>(null)

  const getData = async () => {
    const { data } = await supabase
      .from<Message>('messages')
      .select('*, profile:profiles(id, username)')
      .match({ room_id: roomId })
      .order('created_at')

    if (!data) {
      alert('No messages')

      return
    }

    data.map(message => message.profile).forEach(profile => {
        profileCache[profile.id] = profile
    })

    setMessages(data)
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const subscription = supabase
      .from<Message>(`messages:room_id=eq.${roomId}`)
      .on('INSERT', (payload) => {
       setMessages(current => [...current, {...payload.new, profile: profileCache[payload.new.profile_id]}])
         if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
      })
      .subscribe()

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  const userId = supabase.auth.user()?.id

  return (
    <ul
      className="p-2 flex flex-col space-y-4 overflow-y-scroll max-h-[75vh]"
      ref={messagesRef}
    >
      {messages.map((message) => {
        return (
          <li
            className={
              message.profile_id === userId
                ? 'px-3 py-1 self-end bg-sky-200 rounded-md max-w-[80%] shadow'
                : 'shadow px-3 py-1 bg-slate-100 self-start  rounded-md'
            }
            key={message.id}
          >
            <small className="text-base text-gray-700 flex flex-col">
              <span className="text-xs font-medium text-gray-500">
                {message.profile.username}
              </span>
              <span>{message.content}</span>
            </small>
          </li>
        )
      })}
    </ul>
  )
}

export default Messages
