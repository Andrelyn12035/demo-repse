'use client';
import Table from '@/app/ui/dashboard/table';
import { useEffect, useMemo, useState } from 'react';
import {
  fetchDeclaracionesISR,
  fetchDeclaracionesISRFiltered,
  fetchNomina,
} from '@/app/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { tablaDeclaracionISR } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';
export default function Page() {
  const session = useSession();
  const user = session?.data?.user;
  const cols = useMemo<ColumnDef<tablaDeclaracionISR>[]>(
    () => [
      {
        header: 'Proveedor',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Proveedor',
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
        header: 'Numero de operación',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Numero_de_Operacion',
      },
      {
        header: 'Monto ISR Retenido SyS',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Monto_ISR_Retenido_SyS',
      },
      {
        header: 'Monto IVA Acreditable',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Monto_IVA_Acreditable',
      },
      {
        header: 'Monto IVA a cargo (a favor)',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Monto_IVA_a_cargo',
      },
      {
        header: 'Total declaracion',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Total_declaracion',
      },
      {
        header: 'Linea de captura declaracion',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Linea_de_captura_declaracion',
      },
      {
        header: 'Banco',
        cell: (row: any) => {
          return row.getValue() === null ? (
            <span className=" font-bold text-red-700">Sin información</span>
          ) : (
            row.renderValue()
          );
        },
        accessorKey: 'Banco',
      },
      {
        header: 'Fecha pago',
        cell: (row: any) => {
          return row.getValue() === null ? (
            <span className=" font-bold text-red-700">Sin información</span>
          ) : (
            row.renderValue()
          );
        },
        accessorKey: 'Fecha_pago',
      },
      {
        header: 'Total Pago',
        cell: (row: any) => {
          return row.getValue() === null ? (
            <span className=" font-bold text-red-700">Sin información</span>
          ) : (
            row.renderValue()
          );
        },
        accessorKey: 'Total_Pago',
      },
      {
        header: 'Linea de captura banco',
        cell: (row: any) => {
          return row.getValue() === null ? (
            <span className=" font-bold text-red-700">Sin información</span>
          ) : (
            row.renderValue()
          );
        },
        accessorKey: 'Linea_de_captura_banco',
      },
    ],
    [],
  );
  const [data, setData] = useState<tablaDeclaracionISR[]>([]);
  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await fetchDeclaracionesISR();
      if (response) {
        setData(response);
      }
    };
    const fetch = async () => {
      console.log('name: ', user?.name);
      const response = await fetchDeclaracionesISRFiltered(
        user?.name as string,
      );
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
