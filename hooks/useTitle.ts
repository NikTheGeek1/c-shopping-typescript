import { useEffect, useState } from 'react'

export default function useTitle(initialTitle: string): (newTitle: string) => void {
  const [title, setTitle] = useState<string>(initialTitle)
  const updateTitle = () => {
    document.title = title
  }
  useEffect(updateTitle, [title])
  return setTitle
}
