'use client';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/dashboard/table';
import { useEffect, useMemo, useState } from 'react';
import { fetchNomina, fetchNominaFiltered } from '@/app/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { tablaNomina } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';
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
  const [data, setData] = useState<tablaNomina[]>([]);
  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await fetchNomina();
      if (response) {
        setData(response);
      }
    };
    const fetch = async () => {
      console.log('name: ', user?.name);
      const response = await fetchNominaFiltered(user?.name as string);
      if (response) {
        setData(response);
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
