import type { NextPage } from 'next'
import Head from 'next/head'


const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Happy Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-medium">Happy Chat</h1>
      <input type="text" className=""/>
      </main>

     
    </div>
  )
}

export default Home
