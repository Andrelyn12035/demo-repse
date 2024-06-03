import { sql } from '@vercel/postgres';
import {
  CustomerField,
  ProveedoresTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { OpenAI, ClientOptions } from 'openai';

import { revenue, invoices, users, customers } from './placeholder-data';
import { formatCurrency, getCurrDate } from './utils';
import {
  declaracionIMSS,
  declaracionISR,
  pagoIMSS,
  pagoISR,
  UserData,
} from './definitions'; // for types
import { db } from './db';
import { RowDataPacket } from 'mysql2';
import { get } from 'http';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    //const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    //return data.rows;
    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    /*const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;*/
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredDeclaracionesIMSS(query: string) {
  try {
    const [rows, fields] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM declaracionimss WHERE id_user = ?',
      [query],
    );
    return rows as declaracionIMSS[];
    //return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered DeclaracionesIMSS.');
  }
}
export async function fetchDeclaracionesIMSS() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM declaracionimss;');
    return rows as declaracionIMSS[];
    //return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch DeclaracionesIMSS.');
  }
}
export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchDecIMSS() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM declaracionimss;');
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function getDecISR(query: string, data: declaracionISR[]) {
  try {
    const [result] = await db.execute(query, data);
    await db.end();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function getPagoIMSS() {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM pagoimss;');
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function getPagoISR(query: string, data: pagoISR[]) {
  try {
    const [rows, fields] = await db.execute(query, data);
    await db.end();
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function readDecIMSS(buffer: Buffer, filename: string) {
  const client = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  const image_url = 'data:image/jpeg;base64,' + buffer.toString('base64');
  const response = await client.chat.completions.create({
    model: 'gpt-4o-2024-05-13',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "from the provided image , extract data for each of the example JSON fields between. In the JSON output, replace [data] with each field's extracted data text using only string datatypes. Use a string value of 'N/A' when the field's data text is not found in the provided image. Convert all numbers to a standard 2-place decimal notation. Convert all dates to international format 'yyyy-mm-dd'. For example, dates in the document text may start as something like 18.05.2024 or 3/21/2025, and need to be converted to 2024-05-18 & 2025-03-21 respectively. Some special instructions are: titulo is the title of the document and it usually contains the words 'pago' and-or 'cuotas' is in the top center of the image, 'periodo' is a date under 'PERÍODO QUE COMPRENDE EL PAGO DE SEGUROS IMSS' this date has a 'month-year' format, 'ejercicio' is the year of 'periodo',for 'periodo' return just the month as the month name in spanish, remove dashes from 'rfc'. All fields must be in upper case and keep original languaje, importeIMSS is the value in the row 'SUBTOTAL SEGUROS IMSS' and the column 'SUMA TOTAL'. This is an example JSON: {'titulo': '[data]', 'lineaCaptura': '[data]','ejercicio': '[data]', 'fechaPago': '[data]', 'periodo': '[data]', 'razonSocial': '[data]', 'registroPatronal': '[data]', 'rfc': '[data]', 'importeIMSS': '[data]', 'total': '[data]'} .Return only the final JSON object. Do not return any other output descriptions or explanations, only the JSON object and make sure is a valid one. No notes. Forget about '```json' and '```' delimiters in the output. Make sure property names are in double quotes.",
          },
          {
            type: 'image_url',
            image_url: { url: image_url },
          },
        ],
      },
    ],
    max_tokens: 4096,
  });
  const json_string = response.choices[0].message.content;
  console.log(json_string);
  if (json_string) {
    const json = JSON.parse(json_string) as declaracionIMSS;
    console.log(json);
    try {
      const [result] = await db.execute(
        'INSERT INTO declaracionimss (titulo, lineaCaptura, fechaPago, periodoPago, razonSocial, registroPatronal, rfc, importeIMSS, total, archivo, fechaProcesamiento, ejercicio, id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          json.titulo,
          json.lineaCaptura,
          json.fechaPago,
          json.periodo,
          json.razonSocial,
          json.registroPatronal,
          json.rfc,
          json.importeIMSS,
          json.total,
          filename,
          getCurrDate(),
          json.ejercicio,
          3,
        ],
      );
    } catch (error) {
      console.log(error);
      console.log('Error al insertar en la base de datos declaracionIMSS');
      return error;
    }
  }
}

export async function readDecISR(buffer: Buffer, filename: string) {
  const client = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  const image_url = 'data:image/jpeg;base64,' + buffer.toString('base64');
  const response = await client.chat.completions.create({
    model: 'gpt-4o-2024-05-13',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "from the provided image, extract data for each of the example JSON fields between. In the JSON output, replace [data] with each field's extracted data text using only string datatypes. Use a string value of 'N/A' when the field's data text is not found in the provided image. Convert all numbers to a standard 2-place decimal notation. Convert all dates to international format 'yyyy-mm-dd'. For example, dates in the document text may start as something like 18.05.2024 or 3/21/2025, and need to be converted to 2024-05-18 & 2025-03-21 respectively. Some special instructions are: 'titulo' is the title of the document and it usually contains the words 'ACUSE DE RECIBO' and 'DECLARACIÓN', Administracion is the text that starts with 'SAT' and the text underneath, remove all dashes and white spaces in 'lineaCaptura' it should have 20 characters, all fields must be in upper case, Keep the original language of the data. This is an example JSON: {'rfc': '[data]', 'razonSocial': '[data]', 'ejercicio': '[data]', 'periodo': '[data]', 'conceptoIVA': '[data]', 'iva': '[data]', 'administracion': '[data]', 'aCargoISR': '[data]', 'observacionISRSyS': '[data]', 'titulo': '[data]', 'lineaCaptura': '[data]', 'totalPagado': '[data]', 'tipoDeclaracion': '[data]', 'numOperacion': '[data]'}. Return only the final JSON object. Do not return any other output descriptions or explanations, only the JSON object and make sure is a valid one. No notes. Forget about '```json' and '```' delimiters in the output. Make sure property names are in double quotes.",
          },
          {
            type: 'image_url',
            image_url: { url: image_url },
          },
        ],
      },
    ],
    max_tokens: 4096,
  });
  const json_string = response.choices[0].message.content;
  console.log(json_string);
  if (json_string) {
    const json = JSON.parse(json_string) as declaracionISR;
    console.log(json);
    try {
      const [result] = await db.execute(
        'INSERT INTO declaracionisr (rfc, razonSocial, ejercicio, periodo, conceptoIVA, iva, nombreArchivo, administracion, aCargoISR, observacionISRSyS, titulo, lineaCaptura, totalPagado, tipoDeclaracion, numOperacion, fechaProcesamiento, id_user) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)',
        [
          json.rfc,
          json.razonSocial,
          json.ejercicio,
          json.periodo,
          json.conceptoIVA,
          json.iva,
          filename,
          json.administracion,
          json.aCargoISR,
          json.observacionISRSyS,
          json.titulo,
          json.lineaCaptura,
          json.totalPagado,
          json.tipoDeclaracion,
          json.numOperacion,
          getCurrDate(),
          3,
        ],
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      console.log('Error al insertar en la base de datos declaracionISR');
      return error;
    }
  }
}

export async function readPagoIMSS(buffer: Buffer, filename: string) {
  const client = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  const image_url = 'data:image/jpeg;base64,' + buffer.toString('base64');
  const response = await client.chat.completions.create({
    model: 'gpt-4o-2024-05-13',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "from the provided image, extract data for each of the example JSON fields between. In the JSON output, replace [data] with each field's extracted data text using only string datatypes. Use a string value of 'N/A' when the field's data text is not found in the provided image. Convert all numbers to a standard 2-place decimal notation. Convert all dates to international format 'yyyy-mm-dd'. For example, dates in the document text may start as something like 18.05.2024 or 3/21/2025, and need to be converted to 2024-05-18 & 2025-03-21 respectively. Some special instructions are: 'titulo' is the title of the document and it usually contains the words 'Pago' and-or ' sipare' and-or 'cuotas', 'banco' is one word from the following list [BANAMEX, BBVA, AFIRME, BANBAJIO, BANRE, INBURSA, BANORTE, HSBC, SANTANDER, SCOTIABANK],'periodo' could be a month-year format or a yyyymm format but the final data shoud be the month in spanish and 'ejercicio' is the year of that date, remove all dashes and white spaces in 'lineaCaptura' it should have 53 letters and numbers, all fields must be in upper case and keep their original language. This is an example JSON: {'folioSUA': '[data]',  'periodo': '[data]',  'ejercicio': '[data]',  'lineaCaptura': '[data]',  'registroPatronal': '[data]',  'importeIMSS': '[data]',  'importeRCV': '[data]',  'importeVIV': '[data]',  'importeACV': '[data]',  'totalAPagar': '[data]',  'banco': '[data]', 'fechaPago': '[data]'}. Return only the final JSON object. Do not return any other output descriptions or explanations, only the JSON object and make sure is a valid one. No notes. Forget about '```json' and '```' delimiters in the output. Make sure property names are in double quotes.",
          },
          {
            type: 'image_url',
            image_url: { url: image_url },
          },
        ],
      },
    ],
    max_tokens: 4096,
  });
  const json_string = response.choices[0].message.content;
  console.log(json_string);
  if (json_string) {
    const json = JSON.parse(json_string) as pagoIMSS;
    console.log(json);
    try {
      const [result] = await db.execute(
        'INSERT INTO pagoimss (folioSUA, titulo, periodo, ejercicio, lineaCaptura, registroPatronal, importeIMSS, importeRCV, importeVIV, importeACV, totalAPagar, banco, fechaPago, archivo, fechaProcesamiento, id_user) VALUES (?,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)',
        [
          json.folioSUA,
          json.titulo,
          json.periodo,
          json.ejercicio,
          json.lineaCaptura,
          json.registroPatronal,
          json.importeIMSS,
          json.importeRCV,
          json.importeVIV,
          json.importeACV,
          json.totalAPagar,
          json.banco,
          json.fechaPago,
          filename,
          getCurrDate(),
          3,
        ],
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      console.log('Error al insertar en la base de datos pagoIMSS');
      return error;
    }
  }
}

export async function readPagoISR(buffer: Buffer, filename: string) {
  const client = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  const image_url = 'data:image/jpeg;base64,' + buffer.toString('base64');
  const response = await client.chat.completions.create({
    model: 'gpt-4o-2024-05-13',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "from the provided image, extract data for each of the example JSON fields between. In the JSON output, replace [data] with each field's extracted data text using only string datatypes. Use a string value of 'N/A' when the field's data text is not found in the provided image. Convert all numbers to a standard 2-place decimal notation. Convert all dates to international format 'yyyy-mm-dd'. For example, dates in the document text may start as something like 18.05.2024 or 3/21/2025, and need to be converted to 2024-05-18 & 2025-03-21 respectively. Some special instructions are: 'titulo' is the title of the document and it usually contains the words 'Pago' and 'federales', 'banco' is one word from the following list [BANAMEX, BBVA, AFIRME, BANBAJIO, BANRE, INBURSA, BANORTE, HSBC, SANTANDER, SCOTIABANK], 'lineaCaptura' must have 20 characters pay special atention to that field and check as many times as neccesary in order to get it right, make sure you are not omiting a '2' character after 'p' character, all fields must be in upper case and keep their original language. This is an example JSON: {'titulo': '[data]','banco':'[data]', 'nombreSolicitante': '[data]', 'lineaCaptura': '[data]', 'totalAPagar': '[data]', 'fechaPago': '[data]}. Return only the final JSON object. Do not return any other output descriptions or explanations, only the JSON object and make sure is a valid one. No notes. Forget about '```json' and '```' delimiters in the output. Make sure property names are in double quotes.",
          },
          {
            type: 'image_url',
            image_url: { url: image_url },
          },
        ],
      },
    ],
    max_tokens: 4096,
  });
  const json_string = response.choices[0].message.content;
  console.log(json_string);
  if (json_string) {
    const json = JSON.parse(json_string) as pagoISR;
    console.log(json);
    try {
      const [result] = await db.execute(
        'INSERT INTO pagoisr (titulo, lineaCaptura, fechaPago, totalAPagar, banco, nombreSolicitante, nombreArchivo, fechaProcesamiento, id_user) VALUES (?,? ,? ,? ,? ,? ,? ,? ,?)',
        [
          json.titulo,
          json.lineaCaptura,
          json.fechaPago,
          json.totalAPagar,
          json.banco,
          json.nombreSolicitante,
          filename,
          getCurrDate(),
          3,
        ],
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      console.log('Error al insertar en la base de datos pagoIMSS');
      return error;
    }
  }
}

export async function fetchUsers() {
  try {
    const [rows, fields] = await db.execute<RowDataPacket[]>(
      'SELECT id,name,rfc,role FROM users WHERE role=3',
    );
    console.log('data', rows);
    return rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function writeUser(user: UserData) {
  try {
    const [result] = await db.execute(
      'INSERT INTO users (name, rfc, password, role) VALUES (? ,? ,? ,?)',
      [user.name, user.rfc, user.password, 3],
    );
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log('Error al insertar en la base de datos pagoIMSS');
    return error;
  }
}
