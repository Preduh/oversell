import Head from 'next/head'
import { HeroSection } from '../components/templates/HeroSection'

export default function Home (): JSX.Element {
  return (
    <div className="">
      <Head>
        <title>Oversell</title>
      </Head>

      <HeroSection />
    </div>
  )
}
