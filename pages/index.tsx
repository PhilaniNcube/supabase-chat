import { Input } from '@supabase/ui';
import type { NextPage } from 'next'
import Head from 'next/head'
import Messages from '../components/Messages';
import supabase from '../utils/supabase';
import { useRouter } from 'next/router'

type Room = {
  id: string,
  created_at: string,
  name: string | null
} 


const Home: NextPage = () => {

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const { message } = Object.fromEntries(
      new FormData(form)
    )

    if (typeof message === 'string' && message.trim().length !== 0) {
      form.reset()
      const { data, error } = await supabase.from('messages').insert({ content: message })

      if (error) {
        alert(error.message)
      }
      
      console.log({data, error})
    }

  }

  const handleCreateRoom =  async  () => {
    const { data, error } = await supabase.rpc<Room>('create_room',).single()
    
    if (error) {
      alert(error)
      return
    }
  
    if (data) {
      
      router.push(`/rooms/${data.id}`)
    }
    
    
     
  
    }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Happy Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="flex w-full flex-1 flex-col items-stretch justify-center px-4 lg:px-10 py-6">
        <div className="flex py-2">
        <h1 className="text-2xl font-bold text-gray-600 py-2 " >Happy Chat</h1>
<button className="ml-6 rounded bg-red-600 text-white px-6 py-2 shadow" onClick={handleCreateRoom}>New Room</button>
        </div>
        <div className="flex-1 flex flex-col space-y-3 ">
          <div className="flex-1 bg-gray-200 rounded-md shadow-inner">
            <Messages />
          </div>
          <form onSubmit={handleSubmit} className="flex w-full">
              <Input type="text" name="message" className="w-full" />
          </form>
     
        </div>
      </main>

     
    </div>
  )
}

export default Home
