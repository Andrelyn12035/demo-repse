'use client';
import Table from '@/app/ui/dashboard/table';
import { use, useContext, useEffect, useMemo, useState } from 'react';
import { fetchGenerales, fetchGeneralesFiltered } from '@/app/lib/data';
import { tablaGenerales } from '@/app/lib/definitions';
import { ColumnDef } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import { filters } from '@/app/company/dashboard/layout';
export default function Page() {
  const session = useSession();
  const user = session?.data?.user;
  const cols = useMemo<ColumnDef<tablaGenerales>[]>(
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
        header: 'Opinion de Cumplimiento',
        cell: (row: any) => {
          return row.getValue() === 'No válida' ? (
            <span className=" font-bold text-red-700">No válida</span>
          ) : (
            row.renderValue()
          );
        },
        accessorKey: 'Opinion_de_cumplimiento',
      },
      {
        header: 'Registro ante la STPS',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Registro_ante_la_STPS',
      },
      {
        header: 'Vigencia de Registro',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Vigencia_de_registro',
      },
      {
        header: 'Ultima Actualizacion',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Ultima_actualizacion',
      },
      {
        header: 'Contrato Vigente',
        cell: (row: any) => {
          return row.getValue() === 'No vigente / No entregado' ? (
            <span className=" font-bold text-red-700">No válida</span>
          ) : (
            row.renderValue()
          );
        },
        accessorKey: 'Contrato_vigente',
      },
      {
        header: 'Objeto Social',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Objeto_social',
      },
      {
        header: 'Resumen Contrato IA',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Resumen_contrato_IA',
      },
      {
        header: 'Numero de Empleados',
        cell: (row: any) => row.renderValue(),
        accessorKey: 'Numero_de_empleados',
      },
    ],
    [],
  );
  const context = useContext(filters);
  const [original, setOriginal] = useState<tablaGenerales[]>([]);
  const [data, setData] = useState<tablaGenerales[]>([]);
  const applyFilters = (data: tablaGenerales[]) => {
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
      const response = await fetchGenerales();
      if (response) {
        setOriginal(response);
      }
    };
    const fetch = async () => {
      console.log('name: ', user?.name);
      const response = await fetchGeneralesFiltered(user?.name as string);
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
      <div className="max-w-full">
        <Table columns={cols} data={data} />
      </div>
    </main>
  );
}
