import { ReactNode } from 'react'

interface ToolbarButtonProps {
  onClick: () => void
  isActive: boolean
  children: ReactNode
}

const ToolbarButton = ({ onClick, isActive, children }: ToolbarButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`p-2 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
    >
      {children}
    </button>
  )
}

export default ToolbarButton
