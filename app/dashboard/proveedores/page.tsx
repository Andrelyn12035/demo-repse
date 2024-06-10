import { fetchUsers } from '@/app/lib/data';
import { ProveedoresTableType } from '@/app/lib/definitions';
import InvoicesTable from '@/app/ui/dashboard/table';
import { lusitana } from '@/app/ui/fonts';
import CustomersTable from '@/app/ui/proveedores/table';
import { auth } from '@/auth';
import { redirect } from 'next/navigation'; // Added this line
import Form from '@/app/ui/proveedores/user-form';

export default async function Page() {
  let rows: ProveedoresTableType[] = [];
  const session = await auth();
  if (session?.user) {
    if (session?.user?.image === '1' || session?.user?.image === '2') {
      rows = (await fetchUsers()) as ProveedoresTableType[];
    } else {
      redirect(`/dashboard`);
    }
  }
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Proveedores
      </h1>
      <div className="mt-6 grid w-full grid-cols-1 gap-6 ">
        <CustomersTable proveedores={rows} />
        {session?.user?.image === '1' && <Form />}

        {/*currentPage={currentPage}*/}
        {/*<LatestInvoices latestInvoices={latestInvoices} />*/}
      </div>
    </main>
  );
}
