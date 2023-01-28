import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { SignIn } from '../components/templates/SignIn'
import nookies from 'nookies'

const Entrar = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Oversell - Entrar</title>
      </Head>

      <SignIn />
    </div>
  )
}

export default Entrar

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'oversell.token': token } = nookies.get(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
