'use client';
import { lusitana } from '@/app/ui/fonts';
import InvoicesTable from '@/app/ui/dashboard/table';
import { useEffect, useState } from 'react';
import { fetchRFC } from '@/app/lib/data';
import Dropdown from '@/app/ui/dashboard/dropdown';
import { Data, placeholderData } from '@/app/lib/definitions';
import { años, meses } from '../lib/placeholder-data';

export default function Page() {
  const [rfc, setRfc] = useState('');
  const [ejercicio, setEjercicio] = useState('');
  const [periodo, setPeriodo] = useState('');
  const handleRfc = (e: React.MouseEvent<HTMLLIElement>) => {
    setRfc(e.currentTarget.id);
  };
  const handleEjercicio = (e: React.MouseEvent<HTMLLIElement>) => {
    setEjercicio(e.currentTarget.id);
  };
  const handlePeriodo = (e: React.MouseEvent<HTMLLIElement>) => {
    setPeriodo(e.currentTarget.id);
  };
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
  
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="flex gap-3 ">
        <Dropdown data={data} handler={handleRfc}>
          {rfc == '' && 'RFC'}
          {rfc != '' && rfc}
        </Dropdown>
        <Dropdown data={años} handler={handleEjercicio}>
          {ejercicio == '' && 'Ejercicio'}
          {ejercicio != '' && ejercicio}
        </Dropdown>
        <Dropdown data={meses} handler={handlePeriodo}>
          {periodo == '' && 'Periodo'}
          {periodo != '' && periodo}
        </Dropdown>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-8 lg:grid-cols-8">
        {/*<InvoicesTable rfc={rfc} ejercicio={ejercicio} periodo={periodo} />*/}
        <InvoicesTable rfc={rfc} ejercicio={ejercicio} periodo={periodo} />
      </div>
    </main>
  );
}
