'use client';
import Table from '@/app/ui/dashboard/table';
import { useEffect, useMemo, useState } from 'react';
import { fetchDeclaracionesISR, fetchNomina } from '@/app/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { tablaDeclaracionISR } from '@/app/lib/definitions';
export default function Page() {
  
  const cols = useMemo<ColumnDef<tablaDeclaracionISR>[]>(
    () =>[
      {
          header: "Proveedor",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Proveedor"
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
          header: "Numero de operación",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Numero_de_Operacion"
      },
      {
          header: "Monto ISR Retenido SyS",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Monto_ISR_Retenido_SyS"
      },
      {
          header: "Monto IVA Acreditable",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Monto_IVA_Acreditable"
      },
      {
          header: "Monto IVA a cargo (a favor)",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Monto_IVA_a_cargo"
      },
      {
          header: "Total declaracion",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Total_declaracion"
      },
      {
          header: "Linea de captura declaracion",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Linea_de_captura_declaracion"
      },
      {
          header: "Banco",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Banco"
      },
      {
          header: "Fecha pago",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Fecha_pago"
      },
      {
          header: "Total Pago",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Total_Pago"
      },
      {
          header: "Linea de captura banco",
          cell: (row: any) => row.renderValue(),
          accessorKey: "Linea_de_captura_banco"
      }
  ],
    []
   );
   const [data, setData] = useState<tablaDeclaracionISR[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchDeclaracionesISR();
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
