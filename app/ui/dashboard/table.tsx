import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/dashboard/buttons';
import InvoiceStatus from '@/app/ui/dashboard/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import {
  fetchFilteredDeclaracionesIMSS,
  fetchDeclaracionesIMSS,
} from '@/app/lib/data';
import { declaracionIMSS } from '@/app/lib/definitions';
import { auth } from '@/auth';
export default async function InvoicesTable({
  query /*currentPage,*/,
}: {
  query: string;
  /*currentPage: number;*/
}) {
  let rows: declaracionIMSS[] = [];
  const session = await auth();
  if (session?.user) {
    if (session?.user?.image === '1' || session?.user?.image === '2') {
      rows = await fetchDeclaracionesIMSS();
    } else {
      rows = await fetchFilteredDeclaracionesIMSS(session.user.name || '');
    }
  }

  /* currentPage*/
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 md:pt-0">
          <div className="md:hidden">
            {rows?.map((document) => (
              <div
                key={document.id}
                className="mb-2 w-full rounded-md bg-white p-1"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{document.ejercicio}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {document.periodoPago}
                    </p>
                  </div>
                  {/*<InvoiceStatus status={document.} />*/}
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {document.lineaCaptura}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="py-5 pr-2 font-medium">
                  Ejercicio
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
                  Periodo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Linea
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rows?.map((document) => (
                <tr
                  key={document.id}
                  className="w-1/2 border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{document.ejercicio}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {document.periodoPago}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {document.lineaCaptura}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
