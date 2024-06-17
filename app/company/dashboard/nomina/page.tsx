'use client';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/dashboard/table';
import { useContext, useEffect, useMemo, useState } from 'react';
import { fetchNomina, fetchNominaFiltered } from '@/app/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { tablaNomina } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';
import { filters } from '@/app/company/dashboard/layout';
export default function Page() {
  const session = useSession();
  const user = session?.data?.user;
  const cols = useMemo<ColumnDef<tablaNomina>[]>(
    () => [
      {
        header: 'Proveedor',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'name',
      },
      {
        header: 'Ejercicio',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Ejercicio',
      },
      {
        header: 'Mes',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Mes',
      },
      {
        header: 'RFC Emisor',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'RFC_Emisor',
      },
      {
        header: 'Total CFDI',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Total_CFDI',
      },
      {
        header: 'Monto ISR Retenido',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Monto_ISR_Retenido',
      },
      {
        header: 'Monto IMSS Retenido',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Monto_IMSS_retenido',
      },
      {
        header: 'Numero de empleados puestos a disposición según contrato',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Numero_de_empleados',
      },
      {
        header:
          'Numero de recibos de nomina recibidos en el periodo por empleado',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Numero_de_recibos',
      },
    ],
    [],
  );
  const context = useContext(filters);
  const [original, setOriginal] = useState<tablaNomina[]>([]);
  const [data, setData] = useState<tablaNomina[]>([]);
  const applyFilters = (data: tablaNomina[]) => {
    let temp = data;
    if (context.rfc !== '') {
      temp = temp.filter((row) => row.name === context.rfc);
    }
    if (context.ejercicio !== '') {
      temp = temp.filter((row) => row.Ejercicio === context.ejercicio);
    }
    if (context.periodo !== '') {
      temp = temp.filter((row) => row.Mes === context.periodo);
    }
    setData(temp);
  };
  useEffect(() => {
    applyFilters(original);
  }, [context, original]);
  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await fetchNomina();
      if (response) {
        setOriginal(response);
      }
    };
    const fetch = async () => {
      console.log('name: ', user?.name);
      const response = await fetchNominaFiltered(user?.name as string);
      if (response) {
        setOriginal(response);
      }
    };
    if (user?.image === '1' || user?.image === '2') {
      fetchAdmin();
    } else if (user?.image === '3') {
      fetch();
    }
  }, [user]);

  return (
    <main>
      <div className="">
        <Table columns={cols} data={data} />
      </div>
    </main>
  );
}
