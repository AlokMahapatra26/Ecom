import Footer from '@/components/Application/Footer';
import Header from '@/components/Application/Website/Header';
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default layout