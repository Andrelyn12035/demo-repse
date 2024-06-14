'use client';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/dashboard/table';
import { useEffect, useMemo, useState } from 'react';
import { fetchNomina } from '@/app/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { tablaNomina } from '@/app/lib/definitions';
export default function Page() {
  
  const cols = useMemo<ColumnDef<tablaNomina>[]>(
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
          header: "RFC Emisor",
          cell: (row: any) => row.renderValue(),
          accessorKey: "RFC_Emisor"
      },
      {
          header: "Total CFDI",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Total_CFDI"
      },
      {
          header: "Monto ISR Retenido",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Monto_ISR_Retenido"
      },
      {
          header: "Monto IMSS Retenido",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Monto_IMSS_retenido"
      },
      {
          header: "Numero de Empleados",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Numero_de_empleados"
      },
      {
          header: "Numero de Recibos",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Numero_de_recibos"
      }
],
    []
   );
   const [data, setData] = useState<tablaNomina[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchNomina();
      if (response) {
        setData(response);
      }
    };
    fetch();
  }, []);
  
  return (
    <main>
      <div className="m-">
        <Table columns={cols} data={data}/>
      </div>
    </main>
  );
}
