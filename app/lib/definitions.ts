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
export type tablaDeclaracionIMSS = {
  rfc?: string;
  lineaCaptura?: string;
  periodoPago?: string;
  ejercicio?: string;
  lineaP?: string;
  periodoP?: string;
  ejercicioP?: string;
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
