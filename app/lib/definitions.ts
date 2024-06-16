// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  rfc: string;
  password: string;
  role: string;
};

export type Data = {
  name: string;
};

export type UserData = {
  name: string;
  rfc: string;
  password: string;
};
export type User2 = {
  name: string;
  email: string;
  image: string;
};

export type ProveedoresTableType = {
  id: string;
  name: string;
  rfc: string;
  role: string;
};

export type FormattedProveedoresTable = {
  id: string;
  name: string;
  rfc: string;
  role: string;
};

export type pagoIMSS = {
  id: string;
  folioSUA: string;
  titulo: string;
  periodo: string;
  ejercicio: string;
  lineaCaptura: string;
  registroPatronal: string;
  importeIMSS: string;
  importeRCV: string;
  importeVIV: string;
  importeACV: string;
  totalAPagar: string;
  banco: string;
  fechaPago: string;
  archivo: string;
  fechaProcesamiento: string;
};

export type pagoISR = {
  id: string;
  titulo: string;
  lineaCaptura: string;
  fechaPago: string;
  totalAPagar: string;
  banco: string;
  nombreSolicitante: string;
  nombreArchivo: string;
  fechaProcesamiento: string;
};

export type declaracionISR = {
  id: string;
  rfc: string;
  razonSocial: string;
  ejercicio: string;
  periodo: string;
  conceptoIVA: string;
  iva: string;
  nombreArchivo: string;
  administracion: string;
  aCargoISR: string;
  observacionISRSyS: string;
  titulo: string;
  lineaCaptura: string;
  totalPagado: string;
  tipoDeclaracion: string;
  numOperacion: string;
  fechaProcesamiento: string;
};

export type declaracionIMSS = {
  id: string;
  titulo: string;
  lineaCaptura: string;
  fechaPago: string;
  periodoPago: string;
  razonSocial: string;
  registroPatronal: string;
  rfc: string;
  importeIMSS: string;
  total: string;
  archivo: string;
  fechaProcesamiento: string;
  ejercicio: string;
};
export type tablaGenerales = {
  idG?: string;
  id_user?: string;
  Ejercicio?: string;
  Mes?: string;
  Opinion_de_cumplimiento?: string;
  Registro_ante_la_STPS?: string;
  Vigencia_de_registro?: string;
  Ultima_actualizacion?: string;
  Contrato_vigente?: string;
  Objeto_social?: string;
  Resumen_contrato_IA?: string;
  Numero_de_empleados?: string;
  id?: string;
  name?: string;
  rfc?: string;
  password?: string;
  role?: string;
};
export type tablaDeclaracionISR = {
  rfc?: string;
  lineaCaptura?: string;
  periodoPago?: string;
  ejercicio?: string;
  lineaP?: string;
  periodoP?: string;
  ejercicioP?: string;
};
export type tablaDeclaracionIMSS = {
  name?: string;
  lineaCaptura?: string;
  periodoPago?: string;
  ejercicio?: string;
  lineaP?: string;
  periodoP?: string;
  ejercicioP?: string;
};
export type tablaNomina = {
  id?: string;
  id_user?: string;
  Ejercicio?: string;
  Mes?: string;
  RFC_Emisor?: string;
  Total_CFDI?: string;
  Monto_ISR_Retenido?: string;
  Monto_IMSS_retenido?: string;
  Numero_de_empleados?: string;
  Numero_de_recibos?: string;
};
export type tablaComplemento = {
  id?: string;
  id_user?: string;
  Ejercicio?: string;
  Mes?: string;
  CFDI_Version?: string;
  CFDI_Emisor_Nombre?: string;
  CFDI_Emisor_Rfc?: string;
  CFDI_Emisor_RegimenFiscal?: string;
  CFDI_Receptor_Nombre?: string;
  CFDI_Receptor_Rfc?: string;
  CFDI_Receptor_RegimenFiscalReceptor?: string;
  CFDI_Receptor_DomicilioFiscalReceptor?: string;
  CFDI_LugarExpedicion?: string;
  CFDI_Receptor_UsoCFDI?: string;
  CFDI_FormaPago?: string;
  CFDI_MetodoPago?: string;
  CFDI_CondicionesDePago?: string;
  CFDI_Fecha?: string;
  CFDI_TipoDeComprobante?: string;
  CFDI_SubTotal?: string;
  CFDI_Descuento?: string;
  CFDI_Iva_8?: string;
  CFDI_Iva_16?: string;
  CFDI_Total_Iva?: string;
  CFDI_Monto_IEPS?: string;
  CFDI_Retenciones_Iva?: string;
  CFDI_Retenciones_Isr?: string;
  CFDI_Total?: string;
  CFDI_Subtotal_MXN?: string;
  CFDI_Descuento_MXN?: string;
  CFDI_Total_MXN?: string;
  CFDI_Impuestos_Retenidos_MXN?: string;
  CFDI_Impuestos_Trasladados_MXN?: string;
  CFDI_Moneda?: string;
  CFDI_TipoCambio?: string;
  CFDI_Serie?: string;
  CFDI_Folio?: string;
  CFDI_TimbreFiscalDigital_UUID?: string;
  CFDI_Descripcion_concatenado?: string;
  CFDI_uuid_relacionados_concatenado?: string;
  CFDI_Estatus?: string;
  CFDI_Fecha_de_cancelacion?: string;
};
export interface File {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
}

export interface periodo {
  name: string;
  path: string;
}
export interface placeholderData {
  rfc?: string;
  lineaCaptura?: string;
  periodoPago?: string;
  ejercicio?: string;
  lineaP?: string;
  periodoP?: string;
  ejercicioP?: string;
}
export interface fileInfo {
  name: string;
  link: string;
}

export interface fileData {
  id: string;
  path: string;
  name: string;
  id_user: string;
}
