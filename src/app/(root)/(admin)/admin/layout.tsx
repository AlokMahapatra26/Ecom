import AppSidebar from '@/components/Application/Admin/AppSidebar';
import { ThemeProvider } from '@/components/Application/Admin/ThemeProvider';
import Topbar from '@/components/Application/Admin/Topbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React , {ReactNode} from 'react'
import { Poppins } from 'next/font/google';

interface LayoutProps {
    children: ReactNode;
}

const assistantFont = Poppins({
  weight:['400','500','600','700'],
})


const layout = ({ children }: LayoutProps) => {
  return (

    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
    >
      <SidebarProvider>
      <AppSidebar />

<div className={`${assistantFont.className} antialiased`}>
     <main className="md:w-[calc(100vw-16rem)]" >
        <div className="pt-[70px] px-5 min-h-[calc(100vh-40px)]">

      <Topbar />
          {children}
         <div className='m-8 p-8 border-t'>
          <p className='text-center'>Rudra Silk Saree Admin Panel</p>
         </div>
        </div>
      </main>
</div>
     
    </SidebarProvider>
    </ThemeProvider>
    
  );
};


export default layout