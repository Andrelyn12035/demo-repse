'use client';
import {
  fetchFilteredDeclaracionesIMSS,
  fetchDeclaracionesIMSS,
  fetchRFC,
} from '@/app/lib/data';
import { Data, placeholderData, tablaDeclaracionIMSS } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { placeholder } from '@/app/lib/placeholder-data';
import { set } from 'zod';

export default function InvoicesTable({
  rfc,
  ejercicio,
  periodo,
}: {
  rfc: string;
  ejercicio: string;
  periodo: string;
}) {
  const [rows, setRows] = useState<tablaDeclaracionIMSS[]>([]);
  const session = useSession();
  const user = session?.data?.user;
  useEffect(() => {
    const user = async () => {
      console.log('rfc: ', rfc, 'ejercicio: ', ejercicio, 'periodo: ', periodo)
      if (session?.data?.user) {
        if (session.data.user.image === '1' || session.data.user.image === '2') {
          const datos = await fetchDeclaracionesIMSS();
          console.log('datos: ', datos);
          setRows(datos);
          console.log('rows:pre', rows);
          let temp;
          if (rfc !== '' )  {
            temp = datos.filter((row) => row.rfc === rfc);
            setRows(temp);
          }
          if (ejercicio !== '') {
            console.log('entra a filtro de ejercicio');
            temp = datos.filter((row) => row.ejercicio === ejercicio);
            setRows(temp);
          }
          if (periodo !== '') {
            console.log('entra a filtro de periodo');
            temp = datos.filter((row) => row.periodoPago === periodo);
            setRows(temp);
          }
          console.log('sds: ', datos);
        } else {
          setRows(
            await fetchFilteredDeclaracionesIMSS(session.data.user.name || ''),
          );
        }
      }
    };
    user();
  }, [user, ejercicio, periodo, rfc]);

  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchRFC();
      if (response) {
        setData(response);
      }
    };
    fetch();
  }, []);
  const [filas, setFilas] = useState<tablaDeclaracionIMSS[]>([]);
  useEffect(() => {
    let temp:placeholderData[] = [];

    if(rows.length === 0) {
    data.forEach(value => {
      console.log('value: ', value);
      placeholder.forEach(periodo => {
        let si = periodo
        si.rfc = value.name
        console.log('si: ', si);
        temp.push(si);
        console.log('temo: ', temp)
      });
    });
      setFilas(temp);
      console.log('temp: ', temp);
    }else{
      setFilas(rows);
      temp = [];
    }
  }, [rows])
  console.log('rows: ', rows);
  return (
    
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 md:pt-0">
          <div className="md:hidden">
            {filas?.map((document, index) => (
              
              <div key={index} className="mb-2 w-full rounded-md bg-white p-1">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                  <div className="mb-2 flex items-center">
                      <p>{document.rfc}</p>
                    </div>
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
                      {document?.lineaCaptura}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{document?.ejercicioP}</p>
                    </div>
                    <p className="text-sm text-gray-500">{document?.periodoP}</p>
                  </div>
                  {/*<InvoiceStatus status={document.} />*/}
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{document?.lineaP}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="py-5 pr-20 font-medium">
                  RFC
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
                  Ejercicio
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
                  Periodo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Linea
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
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
              {filas?.map((document, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pr-3">
                    <div className="flex items-center w-4 gap-3">
                      <p className="w-36">{document.rfc}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex items-center w-2 gap-3">
                      <p>{document.ejercicio}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {document.periodoPago}
                  </td>
                  <td className="whitespace-nowrap flex px-3 py-3">
                    <p className="w-36 overflow-hidden">{document.lineaCaptura}</p>
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    <div className="flex items-center gap-3">
                      <p>{document.ejercicioP}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {document.periodoP}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  <p className="w-36 overflow-hidden">{document.lineaP}</p>
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
