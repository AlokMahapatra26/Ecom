import React , {ReactNode} from 'react'

interface LayoutProps {
    children: ReactNode;
}

const layout = ({children}:LayoutProps) => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>{children}</div>
  )
}

export default layout