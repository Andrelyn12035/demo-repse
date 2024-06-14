'use client';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/dashboard/table';
import { useEffect, useMemo, useState } from 'react';
import { fetchGenerales, fetchRFC } from '@/app/lib/data';
import Dropdown from '@/app/ui/dashboard/dropdown';
import { Data, placeholderData, tablaGenerales } from '@/app/lib/definitions';
import { años, meses } from '../lib/placeholder-data';
import { useSession } from 'next-auth/react';
import { ColumnDef } from '@tanstack/react-table';
export default function Page() {
  
  const cols = useMemo<ColumnDef<tablaGenerales>[]>(
    () =>[
      {
          header: "ID",
          cell: (row: any) => row.renderValue(),
          accessorKey: "id"
      },
      {
          header: "ID User",
          cell: (row: any) => row.renderValue(),
          accessorKey: "id_user"
      },
      {
          header: "Ejercicio",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Ejercicio"
      },
      {
          header: "Mes",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Mes"
      },
      {
          header: "Opinion de Cumplimiento",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Opinion_de_cumplimiento"
      },
      {
          header: "Registro ante la STPS",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Registro_ante_la_STPS"
      },
      {
          header: "Vigencia de Registro",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Vigencia_de_registro"
      },
      {
          header: "Ultima Actualizacion",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Ultima_actualizacion"
      },
      {
          header: "Contrato Vigente",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Contrato_vigente"
      },
      {
          header: "Objeto Social",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Objeto_social"
      },
      {
          header: "Resumen Contrato IA",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Resumen_contrato_IA"
      },
      {
          header: "Numero de Empleados",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Numero_de_empleados"
      }
  ],
    []
   );
   const [data, setData] = useState<tablaGenerales[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchGenerales();
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
      <div className="m-">
        <Table columns={cols} data={data}/>
      </div>
    </main>
  );
}
