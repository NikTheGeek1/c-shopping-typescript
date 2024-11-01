'use client'

import React, { useEffect } from 'react'
import Icons from './Icons'
import { cn } from '@/utils/mergeClasses'

interface ModalProps {
  isShow: boolean
  onClose: () => void
  effect?: 'bottom-to-top' | 'ease-out' | 'buttom-to-fit'
  children: React.ReactNode
}

const Modal = ({ isShow, onClose, effect = 'ease-out', children }: ModalProps) => {

  //? Re-Renders
  useEffect(() => {
    if (isShow) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isShow])

  //? Styles
  const effectClasses =
    effect === 'bottom-to-top'
      ? `
  ${isShow ? 'bottom-0 lg:mt-20' : '-bottom-full lg:mt-60'} w-full h-full lg:h-auto lg:max-w-3xl 
    transition-all duration-700 mx-auto relative`
      : effect === 'ease-out'
        ? `
  ${isShow ? 'top-40 transform scale-100' : 'top-40 transform scale-50 '} max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto relative`
        : effect === 'buttom-to-fit'
          ? `
  ${isShow ? 'bottom-0' : '-bottom-full'} w-full h-fit lg:max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto relative`
          : ''

  //? Render(s)
  return (
    <div
      className={`${isShow ? 'opacity-100 visible' : 'opacity-0 invisible '
        } transition-all duration-500 fixed inset-0 left-0 right-0 bottom-0 top-0 z-50 overflow-y-auto`}
    >
      <div
        className="w-screen h-screen bg-gray-400/20 fixed inset-0 left-0 right-0 bottom-0 top-0"
        onClick={onClose}
      />
      <div className={effectClasses}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            //@ts-ignore TODO: onclose type
            return React.cloneElement(child, { onClose })
          }

          return child
        })}
      </div>
    </div>
  )
}

interface ContentProps {
  onClose?: () => void
  children: React.ReactNode
  restProps?: React.HTMLAttributes<HTMLDivElement>
  className?: string
}

const Content = ({ onClose, children, className, ...restProps }: ContentProps) => {

  //? Render(s)
  return (
    <div className={cn(className)} {...restProps}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          //@ts-ignore TODO: onclose type
          return React.cloneElement(child, { onClose })
        }

        return child
      })}
    </div>
  )
}

interface HeaderProps {
  onClose: () => void
  children: React.ReactNode
}

const Header = ({ onClose, children }: HeaderProps) => {

  //? Render(s)
  return (
    <div className="flex items-center justify-between pb-2 border-b-2 border-gray-200">
      <span className="text-sm">{children}</span>
      <button onClick={onClose} className="p-1">
        <Icons.Close className="icon" />
      </button>
    </div>
  )
}

interface BodyProps {
  children: React.ReactNode
}

const Body = ({ children }: BodyProps) => {
  return <>{children}</>
}

const _default = Object.assign(Modal, {
  Modal,
  Content,
  Header,
  Body,
})

export default _default
