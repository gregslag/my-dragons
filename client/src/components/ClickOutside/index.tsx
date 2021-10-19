import React from 'react'

interface ClickOutsideProps {
  active: boolean
  onClick: (e?: MouseEvent) => void
  children: any
}

export const ClickOutside = ({
  active = true,
  onClick,
  children,
}: ClickOutsideProps) => {
  const innerRef = React.useRef()

  function isInDOM(obj: any) {
    return Boolean(obj.closest('body'))
  }
  function hasParent(element: any, root: any) {
    return root && root.contains(element) && isInDOM(element)
  }

  const handleClick = (event: any) => {
    if (!hasParent(event.target, innerRef?.current)) {
      if (typeof onClick === 'function') {
        onClick(event)
      }
    }
  }

  React.useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('touchstart', handleClick)
    }

    return () => {
      if (active) {
        document.removeEventListener('mousedown', handleClick)
        document.removeEventListener('touchstart', handleClick)
      }
    }
  })

  return React.cloneElement(children, { ref: innerRef })
}
