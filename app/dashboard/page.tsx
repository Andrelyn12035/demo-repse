import { Card } from '@/app/ui/dashboard/cards';
import InvoicesTable from '@/app/ui/dashboard/table';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, getPagoIMSS } from '@/app/lib/data';
import { Revenue } from '@/app/lib/definitions';
import { get } from 'http';
//import revenue from '@/app/lib/placeholder-data';
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchInvoicesPages(query);
  const latestInvoices = await fetchLatestInvoices();
  const rows = await getPagoIMSS();
  console.log(rows);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <InvoicesTable query={query} />
        {/*currentPage={currentPage}*/}
        {/*<LatestInvoices latestInvoices={latestInvoices} />*/}
      </div>
    </main>
  );
}
