import Head from 'next/head'
import { Header } from '../components/organisms/Header'

export default function Dashboard (): JSX.Element {
  return (
    <div className='bg-zinc-900 h-screen w-full'>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
    </div>
  )
}
