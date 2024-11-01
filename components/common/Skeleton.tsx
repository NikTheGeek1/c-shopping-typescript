import React from 'react'

interface SkeletonProps {
  count: number
  children: React.ReactNode
}

const Skeleton = ({ count, children }: SkeletonProps) => {
  //? Porps

  //? Assets
  const arr = Array(count).fill('_')

  //? Render(s)
  return (
    <>
      {arr.map((item, index) =>
        React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            // @ts-ignore TODO: figure out the index type
            return React.cloneElement(child, { index })
          }

          return child
        })
      )}
    </>
  )
}

interface ItemsProps {
  index?: number
  className?: string
  children: React.ReactNode
}

const Items = ({ index, children, className }: ItemsProps) => {

  //? Render(s)
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // @ts-ignore TODO: figure out the index type
          return React.cloneElement(child, { index })
        }

        return child
      })}
    </div>
  )
}

interface ItemProps {
  index?: number
  height: string
  width: string
  animated: string
  className?: string
  children?: React.ReactNode
}

export const Item = ({ index, height, width, animated, className, children }: ItemProps) => (
  <div
    key={index}
    className={` ${height} ${width} ${animated === 'background'
        ? 'animate-pulse bg-red-200'
        : animated === 'border'
          ? 'animate-pulse border-2 border-red-200'
          : 'bg-white'
      } rounded-md  ${className}`}
  >
    {children}
  </div>
)

const _default = Object.assign(Skeleton, {
  Skeleton,
  Items,
  Item,
})

export default _default
