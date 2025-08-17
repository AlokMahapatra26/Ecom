import AppSidebar from '@/components/Application/Admin/AppSidebar';
import { ThemeProvider } from '@/components/Application/Admin/ThemeProvider';
import Topbar from '@/components/Application/Admin/Topbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React , {ReactNode} from 'react'

interface LayoutProps {
    children: ReactNode;
}

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


      <main className="md:w-[calc(100vw-16rem)]">
        <div className="pt-[70px] px-5 min-h-[calc(100vh-40px)]">

      <Topbar />
          {children}
          <div className='h-[50px]'>dummy footer</div>
        </div>
      </main>
    </SidebarProvider>
    </ThemeProvider>
    
  );
};


export default layout