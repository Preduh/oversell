import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface LoadingIconProps {
  size: number
}

export const LoadingIcon = ({ size }: LoadingIconProps): JSX.Element => {
  return (
    <div>
      <AiOutlineLoading3Quarters size={size} className='animate-spin text-white' />
    </div>
  )
}
