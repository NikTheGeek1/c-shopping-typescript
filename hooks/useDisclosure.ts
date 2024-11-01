'use client'
import { useState } from 'react'

interface DisclosureActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export default function useDisclosure(): [boolean, DisclosureActions] {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = () => {
    if (!isOpen) setIsOpen(true)
  }

  const close = () => {
    if (isOpen) setIsOpen(false)
  }

  const toggle = () => {
    isOpen ? close() : open()
  }

  return [isOpen, { open, close, toggle }]
}
