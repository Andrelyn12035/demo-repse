import InvoicesTable from '@/app/ui/dashboard/table';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, getPagoIMSS } from '@/app/lib/data';
import { useSession } from 'next-auth/react';
import { authenticate, getDecIMSS } from '@/app/lib/actions';
import {auth} from '@/auth';
import { Upload } from '@/app/ui/dashboard/upload';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth()
  if (session?.user ) {
    console.log("session user aja: "+JSON.stringify(session.user));
  }
  
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchInvoicesPages(query);
  const rows = getDecIMSS();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <Upload />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <InvoicesTable query={query} />
        {/*currentPage={currentPage}*/}
        {/*<LatestInvoices latestInvoices={latestInvoices} />*/}
      </div>
    </main>
  );
}
