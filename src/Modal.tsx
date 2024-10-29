import './Modal.css' // Import the CSS file for styling

import { useLayoutEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  title: string
}

export const Modal = ({ onClose, title, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog ref={dialogRef} onCancel={onClose} className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>x</button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
