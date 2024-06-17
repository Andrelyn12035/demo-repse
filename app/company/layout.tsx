
import { SessionProvider } from 'next-auth/react';
import SideNav from '@/app/ui/dashboard/sidenav';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
    <div className="flex flex-col md:flex-row md:overflow-hidden">
        <div className="flex h-screen w-full md:w-64">
          <SideNav />
        </div>
        <div className="flex w-full flex-col pl-5">
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
      </div>
    
    
  )
}
