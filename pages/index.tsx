import { Input } from '@supabase/ui';
import type { NextPage } from 'next'
import Head from 'next/head'
import Messages from '../components/Messages';
import supabase from '../utils/supabase';
import { useRouter } from 'next/router'
import Link from 'next/link';

type Room = {
  id: string,
  created_at: string,
  name: string | null
} 


const Home: NextPage = () => {

  const router = useRouter()



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
        <div className="flex items-center justify-evenly py-2">
            <h1 className="text-2xl font-bold text-gray-600 py-2 " >Happy Chat</h1>
            <button className="ml-6 rounded bg-red-600 text-white px-6 py-2 shadow" onClick={handleCreateRoom}>New Room</button>
        <Link href="/rooms/ab6df6a9-0ea3-4d5a-aa83-b9c5712dadf1"><a className="bg-green-500 text-white text-2xl font-bold px-4 py-2 rounded">Classic Room</a></Link>
        </div>
      </main>

     
    </div>
  )
}

export default Home
