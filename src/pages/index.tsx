import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { HeroSection } from '../components/templates/HeroSection'
import nookies from 'nookies'

interface HomeProps {
  token: string
}

export default function Home ({ token }: HomeProps): JSX.Element {
  return (
    <div className="dark:bg-zinc-900 h-screen">
      <Head>
        <title>Oversell</title>
      </Head>

      <HeroSection token={token} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'oversell.token': token } = nookies.get(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/entrar',
        permanent: false
      }
    }
  }

  return {
    props: {
      token
    }
  }
}
