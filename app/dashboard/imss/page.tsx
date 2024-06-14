'use client';
import Table from '@/app/ui/dashboard/table';
import { useEffect, useMemo, useState } from 'react';
import { fetchDeclaracionesIMSS } from '@/app/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { tablaDeclaracionIMSS } from '@/app/lib/definitions';
export default function Page() {
  
  const cols = useMemo<ColumnDef<tablaDeclaracionIMSS>[]>(
    () =>[
      {
          header: "RFC",
          cell: (row: any) => row.renderValue(),
          accessorKey: "rfc"
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
          header: "Registro Patronal",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Registro_patronal"
      },
      {
          header: "Total a Pagar",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Total_a_pagar"
      },
      {
          header: "Línea de Captura SIPARE",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Linea_de_captura_SIPARE"
      },
      {
          header: "Banco",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Banco"
      },
      {
          header: "Fecha de Pago",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Fecha_pago"
      },
      {
          header: "Total Pago",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Total_Pago"
      },
      {
          header: "Línea de Captura Banco",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Linea_de_captura_banco"
      }
  ],
    []
   );
   const [data, setData] = useState<tablaDeclaracionIMSS[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchDeclaracionesIMSS();
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
