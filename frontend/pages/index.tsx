import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const initiateDummyTransaction = async ()=>{
    const result = fetch("localhost:8000/api/orders/dummy", {
      method:"POST"
    })
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button className='border border-black py-2 px-4 rounded-lg'>Initiate Dummy Transaction</button>
    </main>
  )
}
