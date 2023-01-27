import { Squares2X2Icon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Transition } from '@headlessui/react'

interface Option {
  id: string
  label: string
  path: string
  icon: JSX.Element
}

const options: Option[] = [
  {
    id: uuid(),
    label: 'Dashboard',
    path: '/dashboard',
    icon: <Squares2X2Icon className="w-6 h-6" />
  },
  {
    id: uuid(),
    label: 'Perfil',
    path: '/perfil',
    icon: <UserIcon className="w-6 h-6" />
  }
]

export function UserPopover (): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const router = useRouter()

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="w-screen h-screen fixed z-10 top-0 right-0"
        />
      )}

      <div className="relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className={`${
            isOpen
              ? 'ring-2 ring-offset-2 ring-offset-zinc-700 ring-purple-blue ring-opacity-50'
              : ''
          } w-12 h-12 bg-purple-blue rounded-full flex items-center justify-center cursor-pointer outline-none hover:ring-2 hover:ring-offset-2 hover:ring-offset-zinc-700 hover:ring-purple-blue hover:ring-opacity-50`}
        >
          <p className="uppercase text-gray-100 font-bold text-xl">T</p>
        </button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
          show={isOpen}
        >
          <div
            className={`${
              isOpen ? '' : 'hidden'
            } absolute right-0 z-10 mt-3 w-56 transform px-4 sm:px-0 lg:max-w-3xl`}
          >
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative space-y-2 bg-zinc-600 p-4 lg:grid-cols-2">
                {options.map((option) => {
                  return (
                    <Link
                      key={option.id}
                      href={option.path}
                      onMouseLeave={() => setIsHover(false)}
                      onMouseEnter={() => {
                        if (option.path !== router.pathname) {
                          setIsHover(true)
                        }
                      }}
                      onClick={() => setIsOpen(false)}
                      className={`flex space-x-2 p-2 hover:bg-zinc-700 hover:rounded-md transition-all ${
                        option.path === router.pathname && !isHover
                          ? 'bg-zinc-700 rounded-md'
                          : ''
                      }`}
                    >
                      <div className="text-gray-50">{option.icon}</div>
                      <p className="text-gray-50">{option.label}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  )
}
