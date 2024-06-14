'use client';
import { lusitana } from '@/app/ui/fonts';
import InvoicesTable from '@/app/ui/dashboard/tabla_complemento';
import { useEffect, useState } from 'react';
import { fetchRFC } from '@/app/lib/data';
import Dropdown from '@/app/ui/dashboard/dropdown';
import { Data, placeholderData } from '@/app/lib/definitions';
import { años, meses } from '@/app/lib/placeholder-data';
import { useSession } from 'next-auth/react';

export default function Page() {
  const [rfc, setRfc] = useState('');
  const [ejercicio, setEjercicio] = useState('');
  const [periodo, setPeriodo] = useState('');
  const session = useSession();
  const user = session?.data?.user;
  const handleRfc = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.id == rfc) {
      setRfc('');
    }else{
      setRfc(e.currentTarget.id);
    }
  };
  const handleEjercicio = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.id == ejercicio) {
      setEjercicio('');
    }else{
      setEjercicio(e.currentTarget.id);
    }
  };
  const handlePeriodo = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.id == periodo) {
      setPeriodo('');
    }else{
      setPeriodo(e.currentTarget.id);
    }
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
        { session?.data?.user?.image === '1'|| session?.data?.user?.image === '2' && (
        <Dropdown data={data} selected={rfc} handler={handleRfc}>
          {rfc == '' && <span className="block w-full">RFC</span>}
          {rfc != '' && <span className="block w-full font-bold"> {rfc} </span>}
        </Dropdown>)}
        <Dropdown data={años} selected={ejercicio} handler={handleEjercicio}>
          {ejercicio == '' && <span className="block w-full">Ejercicio</span>}
          {ejercicio != '' && <span className="block w-full font-bold"> {ejercicio} </span>}
        </Dropdown>
        <Dropdown data={meses} selected={periodo} handler={handlePeriodo}>
          {periodo == '' && <span className="block w-full ">Periodo</span>}
          {periodo != '' && <span className="block w-full font-bold"> {periodo} </span>}
        </Dropdown>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-8 lg:grid-cols-8">
        {/*<InvoicesTable rfc={rfc} ejercicio={ejercicio} periodo={periodo} />*/}
        <InvoicesTable rfc={rfc} ejercicio={ejercicio} periodo={periodo} />
      </div>
    </main>
  );
}
