import React from 'react';
import s from './styles.module.scss'
import Portal from '@reach/portal'
import { ClickOutside, SVG } from '..'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
  onEnter?: () => void | null
}

export const Modal: React.FC<Props> = ({ children, open, onClose }) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>

  const handleKey = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  React.useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
        window.addEventListener('keydown', handleKey)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearAllBodyScrollLocks()
    }
  }, [open, handleKey])

  return (
    <Portal>
      {open ? (
        <div className={s.root} ref={ref}>
          <ClickOutside active={open} onClick={() => onClose && onClose()}>
            <div className={s.modal} role="dialog">
              {onClose && (
                <button
                  className={s.close}
                  onClick={() => onClose()}
                  aria-label="Close panel"
                >
                  <SVG.Cross />
                </button>
              )}
              {children}
            </div>
          </ClickOutside>
        </div>
      ) : null}
    </Portal>
  )
}
