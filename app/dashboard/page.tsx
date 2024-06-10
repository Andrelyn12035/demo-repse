'use client';
import InvoicesTable from '@/app/ui/dashboard/table';
import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';
export default function Page() {
  const [rfc, setRfc] = useState('');
  const [ejercicio, setEjercicio] = useState('');
  const [periodo, setPeriodo] = useState('');
  const handleRfc = () => {};
  const handleEjercicio = () => {};
  const handlePeriodo = () => {};

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-8 lg:grid-cols-8">
        <InvoicesTable rfc={rfc} ejercicio={ejercicio} periodo={periodo} />
      </div>
    </main>
  );
}
