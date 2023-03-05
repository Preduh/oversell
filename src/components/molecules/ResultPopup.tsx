import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../contexts/Theme'
import { PrimaryButton } from '../atoms/PrimaryButton'

interface ResultPopupProps {
  title: string
  message: string
  type: 'success' | 'error'
  setResult: Dispatch<SetStateAction<boolean>>
  onClose?: () => void
}

export function ResultPopup ({ title, message, type, setResult, onClose }: ResultPopupProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(true)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  const close = (): void => {
    setIsOpen(false)
    setResult(false)

    if (onClose) onClose()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={close}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="space-y-4 w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-700  p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex space-x-2">
                    {type === 'success' ? (<div className="border-r-4 rounded-full border-green-500" />) : (<div className="border-r-4 rounded-full border-red-500" />)}

                    <div className="space-y-4">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >
                        {title}
                      </Dialog.Title>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <PrimaryButton onClick={close}>Fechar</PrimaryButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
