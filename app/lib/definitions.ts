// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { string } from 'zod';

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  rfc: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
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
  remitente: string;
  asunto: string;
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
  remitente: string;
  asunto: string;
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
  remitente: string;
  asunto: string;
};

/*
ID
Titulo
LC
FechaPago
PeriodoPago
RazonSocial
RegistroPatronal
RFC
ImporteIMSS
Total
Archivo
FechaProcesamiento
Remitente
Asunto
Ejercicio
*/
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
  remitente: string;
  asunto: string;
  ejercicio: string;
};
