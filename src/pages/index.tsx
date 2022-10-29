import Head from 'next/head'
import { HeroSection } from '../components/templates/HeroSection'

export default function Home (): JSX.Element {
  return (
    <div className="dark:bg-zinc-900 h-screen">
      <Head>
        <title>Oversell</title>
      </Head>

      <HeroSection />
    </div>
  )
}
