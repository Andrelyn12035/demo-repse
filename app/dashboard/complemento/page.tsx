'use client';
import { lusitana } from '@/app/ui/fonts';
import Table from '@/app/ui/dashboard/table';
import { useEffect, useMemo, useState } from 'react';
import { fetchComplemento } from '@/app/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { tablaComplemento } from '@/app/lib/definitions';
export default function Page() {
  
  const cols = useMemo<ColumnDef<tablaComplemento>[]>(
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
          header: "CFDI Version",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Version"
      },
      {
          header: "CFDI Emisor Nombre",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Emisor_Nombre"
      },
      {
          header: "CFDI Emisor Rfc",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Emisor_Rfc"
      },
      {
          header: "CFDI Emisor Regimen Fiscal",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Emisor_RegimenFiscal"
      },
      {
          header: "CFDI Receptor Nombre",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Receptor_Nombre"
      },
      {
          header: "CFDI Receptor Rfc",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Receptor_Rfc"
      },
      {
          header: "CFDI Receptor Regimen Fiscal Receptor",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Receptor_RegimenFiscalReceptor"
      },
      {
          header: "CFDI Receptor Domicilio Fiscal Receptor",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Receptor_DomicilioFiscalReceptor"
      },
      {
          header: "CFDI Lugar Expedicion",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_LugarExpedicion"
      },
      {
          header: "CFDI Receptor Uso CFDI",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Receptor_UsoCFDI"
      },
      {
          header: "CFDI Forma Pago",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_FormaPago"
      },
      {
          header: "CFDI Metodo Pago",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_MetodoPago"
      },
      {
          header: "CFDI Condiciones De Pago",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_CondicionesDePago"
      },
      {
          header: "CFDI Fecha",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Fecha"
      },
      {
          header: "CFDI Tipo De Comprobante",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_TipoDeComprobante"
      },
      {
          header: "CFDI SubTotal",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_SubTotal"
      },
      {
          header: "CFDI Descuento",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Descuento"
      },
      {
          header: "CFDI Iva 8",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Iva_8"
      },
      {
          header: "CFDI Iva 16",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Iva_16"
      },
      {
          header: "CFDI Total Iva",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Total_Iva"
      },
      {
          header: "CFDI Monto IEPS",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Monto_IEPS"
      },
      {
          header: "CFDI Retenciones Iva",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Retenciones_Iva"
      },
      {
          header: "CFDI Retenciones Isr",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Retenciones_Isr"
      },
      {
          header: "CFDI Total",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Total"
      },
      {
          header: "CFDI Subtotal MXN",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Subtotal_MXN"
      },
      {
          header: "CFDI Descuento MXN",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Descuento_MXN"
      },
      {
          header: "CFDI Total MXN",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Total_MXN"
      },
      {
          header: "CFDI Impuestos Retenidos MXN",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Impuestos_Retenidos_MXN"
      },
      {
          header: "CFDI Impuestos Trasladados MXN",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Impuestos_Trasladados_MXN"
      },
      {
          header: "CFDI Moneda",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Moneda"
      },
      {
          header: "CFDI Tipo Cambio",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_TipoCambio"
      },
      {
          header: "CFDI Serie",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Serie"
      },
      {
          header: "CFDI Folio",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Folio"
      },
      {
          header: "CFDI Timbre Fiscal Digital UUID",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_TimbreFiscalDigital_UUID"
      },
      {
          header: "CFDI Descripcion Concatenado",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Descripcion_concatenado"
      },
      {
          header: "CFDI UUID Relacionados Concatenado",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_uuid_relacionados_concatenado"
      },
      {
          header: "CFDI Estatus",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Estatus"
      },
      {
          header: "CFDI Fecha de Cancelacion",
          cell: (row: any) => row.renderValue(),
          accessorKey: "CFDI_Fecha_de_cancelacion"
      }
  ],
    []
   );
   const [data, setData] = useState<tablaComplemento[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchComplemento();
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
