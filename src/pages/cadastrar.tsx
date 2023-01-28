import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { SignUp } from '../components/templates/SignUp'
import nookies from 'nookies'

const Cadastrar = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Oversell - Entrar</title>
      </Head>

      <SignUp />
    </div>
  )
}

export default Cadastrar

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
