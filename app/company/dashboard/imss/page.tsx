'use client';
import Table from '@/app/ui/dashboard/table';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  fetchDeclaracionesIMSS,
  fetchFilteredDeclaracionesIMSS,
} from '@/app/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { tablaDeclaracionIMSS } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';
import { filters } from '@/app/company/dashboard/layout';
export default function Page() {
  const session = useSession();
  const user = session?.data?.user;
  const cols = useMemo<ColumnDef<tablaDeclaracionIMSS>[]>(
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
        header: 'Registro Patronal',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Registro_patronal',
      },
      {
        header: 'Total a Pagar',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Total_a_pagar',
      },
      {
        header: 'Línea de Captura SIPARE',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Linea_de_captura_SIPARE',
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
        header: 'Fecha de Pago',
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
        header: 'Línea de Captura Banco',
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
  const context = useContext(filters);
  const [original, setOriginal] = useState<tablaDeclaracionIMSS[]>([]);
  const [data, setData] = useState<tablaDeclaracionIMSS[]>([]);
  const applyFilters = (data: tablaDeclaracionIMSS[]) => {
    let temp = data;
    if (context.rfc !== '') {
      temp = temp.filter((row) => row.Proveedor === context.rfc);
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
      const response = await fetchDeclaracionesIMSS();
      if (response) {
        setOriginal(response);
      }
    };
    const fetch = async () => {
      console.log('name: ', user?.name);
      const response = await fetchFilteredDeclaracionesIMSS(
        user?.name as string,
      );
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
