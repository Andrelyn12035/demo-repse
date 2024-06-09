import InvoicesTable from '@/app/ui/dashboard/table';
import { lusitana } from '@/app/ui/fonts';
import { getDecIMSS } from '@/app/lib/actions';
import { auth } from '@/auth';
import { Button } from '../ui/button';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth();
  if (session?.user) {
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchInvoicesPages(query);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-8 lg:grid-cols-8">
        <InvoicesTable query={query} />
        {/*currentPage={currentPage}*/}
        {/*<LatestInvoices latestInvoices={latestInvoices} />*/}
      </div>
    </main>
  );
}
