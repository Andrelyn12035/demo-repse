'use server';
import { OpenAI } from 'openai';
import { auth } from '@/auth';
import { getCurrDate } from './utils';
import {
  declaracionIMSS,
  declaracionISR,
  pagoIMSS,
  pagoISR,
  UserData,
  User,
  fileData,
  Data,
  tablaDeclaracionIMSS,
  tablaGenerales,
  tablaDeclaracionISR,
} from './definitions'; // for types
import { db } from './db';
import { RowDataPacket } from 'mysql2';

export async function fetchGenerales() {
  try {
    const [rows, fields] = await db.execute(
      'SELECT  * from generales;',
    );
    console.log(rows);
    return rows as tablaGenerales[];
    //return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch DeclaracionesIMSS.');
  }
}

export async function fetchComplemento() {
  try {
    const [rows, fields] = await db.execute(
      'SELECT  * from complemento;',
    );
    return rows as tablaGenerales[];
    //return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch DeclaracionesIMSS.');
  }
}

export async function fetchNomina() {
  try {
    const [rows, fields] = await db.execute(
      'SELECT  * from recibos;',
    );
    console.log(rows);
    return rows as tablaGenerales[];
    //return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch DeclaracionesIMSS.');
  }
}

export async function fetchFilteredDeclaracionesIMSS(query: string) {
  try {
    const [rows, fields] = await db.execute<RowDataPacket[]>(
      'SELECT u.rfc, d.ejercicio, d.periodoPago, d.lineaCaptura, p.ejercicio AS ejercicioP, p.periodo AS periodoP, p.lineaCaptura AS lineaP FROM declaracionimss d LEFT JOIN pagoimss p ON d.lineaCaptura =  p.lineaCaptura and d.id_user = ? left join users u on d.id_user= u.id',
      [query],
    );
    return rows as tablaDeclaracionIMSS[];
    //return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered DeclaracionesIMSS.');
  }
}
export async function fetchDeclaracionesIMSS() {
  try {
    const [rows, fields] = await db.execute(
      'SELECT u.rfc, d.ejercicio as Ejercicio, d.periodoPago as Mes, d.registroPatronal as Registro_patronal, d.total as Total_a_pagar, d.lineaCaptura as Linea_de_captura_SIPARE, p.banco as Banco, p.fechaPago as Fecha_pago, p.totalAPagar as Total_Pago, p.lineaCaptura AS Linea_de_captura_banco FROM declaracionimss d LEFT JOIN pagoimss p ON d.lineaCaptura =  p.lineaCaptura left join users u on d.id_user= u.id;',
    );
    console.log(rows);
    return rows as tablaDeclaracionIMSS[];
    //return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch DeclaracionesIMSS.');
  }
}

export async function fetchDeclaracionesISR() {
  try {
    const [rows, fields] = await db.execute(
      'SELECT u.rfc as Proveedor, d.ejercicio as Ejercicio,d.periodo as Mes,d.numOperacion as Numero_de_Operacion,d.aCargoISR as Monto_ISR_Retenido_SyS,d.iva as Monto_IVA_Acreditable,d.iva as Monto_IVA_a_cargo,d.totalPagado as Total_declaracion,d.lineaCaptura as Linea_de_captura_declaracion,p.banco as Banco,p.fechaPago as Fecha_pago,p.totalAPagar as Total_Pago,p.lineaCaptura AS Linea_de_captura_banco FROM declaracionisr d LEFT JOIN pagoisr p ON d.lineaCaptura =  p.lineaCaptura left join users u on d.id_user= u.id;',
    );
    console.log(rows);
    return rows as tablaDeclaracionISR[];
    //return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch DeclaracionesIMSS.');
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

export async function readDecIMSS(buffer: Buffer, filename: string, id_user: string | null) {
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
            text: "from the provided image , extract data for each of the example JSON fields between. In the JSON output, replace [data] with each field's extracted data text using only string datatypes. Use a string value of 'N/A' when the field's data text is not found in the provided image. Convert all numbers to a standard 2-place decimal notation. Convert all dates to international format 'yyyy-mm-dd'. For example, dates in the document text may start as something like 18.05.2024 or 3/21/2025, and need to be converted to 2024-05-18 & 2025-03-21 respectively. Some special instructions are: 'titulo' is the title of the document and it usually contains the words 'pago' and-or 'cuotas' is in the top center of the image, 'periodoPago' is a date under 'PERÍODO QUE COMPRENDE EL PAGO DE SEGUROS IMSS' this date has a 'month-year' format, 'ejercicio' is the year of 'periodo',for 'periodoPago' return just the month as the month name in spanish, remove dashes from 'rfc', remove all dashes and blank spaces in 'lineaCaptura' it should have 53 letters and numbers. All fields must be in upper case and keep original languaje, importeIMSS is the value in the row 'SUBTOTAL SEGUROS IMSS' and the column 'SUMA TOTAL'. This is an example JSON: {'titulo': '[data]', 'lineaCaptura': '[data]','ejercicio': '[data]', 'fechaPago': '[data]', 'periodoPago': '[data]', 'razonSocial': '[data]', 'registroPatronal': '[data]', 'rfc': '[data]', 'importeIMSS': '[data]', 'total': '[data]'} .Return only the final JSON object. Do not return any other output descriptions or explanations, only the JSON object and make sure is a valid one. No notes. Forget about '```json' and '```' delimiters in the output. Make sure property names are in double quotes.",
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
      const session = await auth();
      let id
      if (id_user){
        id = id_user
      }else{
        id = session?.user?.name
      }
      if (id) {
        const [result] = await db.execute(
          'INSERT INTO declaracionimss (titulo, lineaCaptura, fechaPago, periodoPago, razonSocial, registroPatronal, rfc, importeIMSS, total, archivo, fechaProcesamiento, ejercicio, id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            json.titulo,
            json.lineaCaptura,
            json.fechaPago,
            json.periodoPago,
            json.razonSocial,
            json.registroPatronal,
            json.rfc,
            json.importeIMSS,
            json.total,
            filename,
            getCurrDate(),
            json.ejercicio,
            id,
          ],
        );
      }
    } catch (error) {
      console.log(error);
      console.log('Error al insertar en la base de datos declaracionIMSS');
      return error;
    }
  }
}

export async function readDecISR(buffer: Buffer, filename: string , id_user: string | null) {
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
      const session = await auth();
      let id
      if (id_user){
        id = id_user
      }else{
        id = session?.user?.name
      }
      if (id) {
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
            id,
          ],
        );
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      console.log('Error al insertar en la base de datos declaracionISR');
      return error;
    }
  }
}

export async function readPagoIMSS(buffer: Buffer, filename: string, id_user: string | null) {
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
            text: "from the provided image, extract data for each of the example JSON fields between. In the JSON output, replace [data] with each field's extracted data text using only string datatypes. Use a string value of 'N/A' when the field's data text is not found in the provided image. Convert all numbers to a standard 2-place decimal notation. Convert all dates to international format 'yyyy-mm-dd'. For example, dates in the document text may start as something like 18.05.2024 or 3/21/2025, and need to be converted to 2024-05-18 & 2025-03-21 respectively. Some special instructions are: 'titulo' is the title of the document and it usually contains the words 'Pago' and-or ' sipare' and-or 'cuotas', 'banco' is one word from the following list [BANAMEX, BBVA, AFIRME, BANBAJIO, BANRE, INBURSA, BANORTE, HSBC, SANTANDER, SCOTIABANK],'periodo' could be a month-year format or a yyyymm format but the final data shoud be the month in spanish and 'ejercicio' is the year of that date, remove all dashes and white spaces in 'lineaCaptura' it should have 53 letters and numbers, all fields must be in upper case and keep their original language, 'titulo is the title of the document'. This is an example JSON: {'folioSUA': '[data]',  'periodo': '[data]',  'ejercicio': '[data]',  'lineaCaptura': '[data]',  'registroPatronal': '[data]',  'importeIMSS': '[data]',  'importeRCV': '[data]',  'importeVIV': '[data]',  'importeACV': '[data]',  'totalAPagar': '[data]',  'banco': '[data]', 'fechaPago': '[data]', 'titulo': '[titulo]'}. Return only the final JSON object. Do not return any other output descriptions or explanations, only the JSON object and make sure is a valid one. No notes. Forget about '```json' and '```' delimiters in the output. Make sure property names are in double quotes.",
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
      const session = await auth();
      let id
      if (id_user){
        id = id_user
      }else{
        id = session?.user?.name
      }
      if (id) {
        const [result] = await db.execute(
          'INSERT INTO pagoimss (folioSUA, titulo, periodo, ejercicio, lineaCaptura, registroPatronal, importeIMSS, importeRCV, importeVIV, importeACV, totalAPagar, banco, fechaPago, archivo, fechaProcesamiento, id_user) VALUES (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)',
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
            id,
          ],
        );

        console.log(result);
      }
    } catch (error) {
      console.log(error);
      console.log('Error al insertar en la base de datos pagoIMSS');
      return error;
    }
  }
}

export async function readPagoISR(buffer: Buffer, filename: string, id_user: string | null) {
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
            text: "from the provided image, extract data for each of the example JSON fields between. In the JSON output, replace [data] with each field's extracted data text using only string datatypes. Use a string value of 'N/A' when the field's data text is not found in the provided image. Convert all numbers to a standard 2-place decimal notation. Convert all dates to international format 'yyyy-mm-dd'. For example, dates in the document text may start as something like 18.05.2024 or 3/21/2025, and need to be converted to 2024-05-18 & 2025-03-21 respectively. Some special instructions are: 'titulo' is the title of the document and it usually contains the words 'Pago' and 'federales', 'banco' is one word from the following list [BANAMEX, BBVA, AFIRME, BANBAJIO, BANRE, INBURSA, BANORTE, HSBC, SANTANDER, SCOTIABANK], 'lineaCaptura' must have 20 characters pay special atention to that field and check as many times as neccesary in order to get it right, remove dashes and whitespaces from this field, all fields must be in upper case and keep their original language. This is an example JSON: {'titulo': '[data]','banco':'[data]', 'nombreSolicitante': '[data]', 'lineaCaptura': '[data]', 'totalAPagar': '[data]', 'fechaPago': '[data]}. Return only the final JSON object. Do not return any other output descriptions or explanations, only the JSON object and make sure is a valid one. No notes. Forget about '```json' and '```' delimiters in the output. Make sure property names are in double quotes.",
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
      const session = await auth();
      let id
      if (id_user){
        id = id_user
      }else{
        id = session?.user?.name
      }
      if (id) {
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
            id,
          ],
        );
        console.log(result);
      }
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
/*
path
name
id_user
*/
export async function writeNewFile(
  ejercicio: string,
  periodo: string,
  tipo: string,
  name: string,
  id_user: string | null,
) {
  try {
    const session = await auth();
    if (id_user) {
      console.log('params', ejercicio, periodo, tipo, name, id_user);
      const [result, fields] = await db.execute(
        'INSERT INTO files (ejercicio,periodo, tipo, name, id_user) VALUES (? ,? ,?, ?, ?)',
        [ejercicio, periodo, tipo, name, id_user],
      );
      return result;
    } else if (session?.user?.name) {
      const id_user = session?.user?.name;
      console.log('params', ejercicio, periodo, tipo, name, id_user);
      const [result, fields] = await db.execute(
        'INSERT INTO files (ejercicio,periodo, tipo, name, id_user) VALUES (? ,? ,?, ?, ?)',
        [ejercicio, periodo, tipo, name, id_user],
      );
      return result;
    }
  } catch (error) {
    console.log(error);
    console.log('Error al insertar en la base de datos pagoIMSS');
    return error;
  }
}

export async function fetchFiles(path: string, id: string) {
  try {
    const session = await auth();
    if (session?.user?.name) {
      const params = path.split('/');
      const tipo = params[params.length - 1];
      const periodo = params[params.length - 2];
      const ejercicio = params[params.length - 3];
      if (id !== '') {
        const [rows, fields] = await db.execute<RowDataPacket[]>(
          'SELECT * FROM files WHERE id_user = ? and ejercicio = ? and periodo = ? and tipo = ?',
          [id, ejercicio, periodo, tipo],
        );
        console.log(rows);
        return rows as fileData[];
      } else {
        const [rows, fields] = await db.execute<RowDataPacket[]>(
          'SELECT * FROM files WHERE id_user = ? and ejercicio = ? and periodo = ? and tipo = ? ',
          [session.user.name, ejercicio, periodo, tipo],
        );
        console.log(rows);
        return rows as fileData[];
      }
    }
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all files');
  }
}

export async function fetchProveedores() {
  try {
    const session = await auth();
    if (session?.user?.name) {
      const [rows, fields] = await db.execute<RowDataPacket[]>(
        'SELECT * FROM users WHERE role = 3',
      );
      console.log(rows);
      return rows as User[];
    }
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all files');
  }
}

export async function fetchRFC() {
  try {
    const session = await auth();
    if (session?.user?.name) {
      const [rows, fields] = await db.execute<RowDataPacket[]>(
        'SELECT rfc AS name FROM users WHERE role = 3',
      );
      return rows as Data[];
    }
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all files');
  }
}

