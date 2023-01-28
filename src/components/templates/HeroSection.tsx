import { Header } from '../organisms/Header'
import { Hero } from '../organisms/Hero'

interface HeroProps {
  token: string
}

export const HeroSection = ({ token }: HeroProps): JSX.Element => {
  return (
    <section className='pt-16'>
      <Header token={token} />
      <Hero />
    </section>
  )
}
