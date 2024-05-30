import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/dashboard/buttons';
import InvoiceStatus from '@/app/ui/dashboard/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredDeclaraciones } from '@/app/lib/data';
import { declaracionIMSS } from '@/app/lib/definitions';
export default async function InvoicesTable({
  query /*currentPage,*/,
}: {
  query: string;
  /*currentPage: number;*/
}) {
  const rows: declaracionIMSS[] =
    await fetchFilteredDeclaraciones(query); /* currentPage*/
  console.log(rows);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {rows?.map((document) => (
              <div
                key={document.id}
                className="mb-2 w-full rounded-md bg-white p-4"
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
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {document.lineaCaptura}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={document.id} />
                    <DeleteInvoice id={document.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Ejercicio
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Periodo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Linea
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rows?.map((document) => (
                <tr
                  key={document.ejercicio}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{document.ejercicio}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {document.periodoPago}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {document.lineaCaptura}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={document.id} />
                      <DeleteInvoice id={document.id} />
                    </div>
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