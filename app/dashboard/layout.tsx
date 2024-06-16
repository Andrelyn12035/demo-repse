import SideNav from '@/app/ui/dashboard/sidenav';
import { SessionProvider } from 'next-auth/react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <div className="flex flex-col md:flex-row md:overflow-hidden">
          <div className="flex h-screen w-full md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-1 md:overflow-y-auto md:py-5">
            {children}
          </div>
        </div>
      </SessionProvider>
    </>
  );
}
