import { ButtonLabel } from '../atoms/ButtonLabel'
import { RightArrowIcon } from '../atoms/RightArrowIcon'

export const SignInButton = (): JSX.Element => {
  return (
    <button id="signin-button" className="inline-flex items-center text-white bg-[#6366F1] transition-colors border-0 py-1 px-3 focus:outline-none hover:bg-[#5154e0] rounded text-base mt-4 md:mt-0">
      <ButtonLabel label="Entrar" />
      <RightArrowIcon />
    </button>
  )
}
