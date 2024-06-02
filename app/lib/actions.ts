'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import {
  fetchDecIMSS,
  readDecIMSS,
  readDecISR,
  readPagoIMSS,
  readPagoISR,
} from './data';
import { classifyText, pdfToIMG } from './utils';
import { createWorker } from 'tesseract.js';
import { OpenAI, ClientOptions } from 'openai';
import fs from 'fs';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('formData', formData);
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function getDecIMSS() {
  try {
    const decIMSS = await fetchDecIMSS();
    return decIMSS;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function uploadFiles(formData: FormData) {
  const files = formData.getAll('files');
  console.log('Files:', files);
  let i = 0;
  for (const file of files) {
    if (file instanceof File) {
      let buffer = Buffer.from(await file.arrayBuffer());
      const fileType = '.' + file.type.split('/')[1];
      const outputFileName = `yourfilenamehere${i}${fileType}`;
      if (fileType === '.pdf') {
        pdfToIMG(buffer); /*
        console.log('PDF converted to image.', Buffer.byteLength(buffer));
      }
      fs.writeFileSync(`hola.png`, buffer);
      (async () => {
        const worker = await createWorker('spa', 1, {
          workerPath:
            './node_modules/tesseract.js/src/worker-script/node/index.js',
        });
        const {
          data: { text },
        } = await worker.recognize(buffer);
        console.log('Text:', text.toUpperCase());
        const type = classifyText(text.toUpperCase());
        console.log('Type:', type);
        switch (type) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          default:
            break;
        }
        await worker.terminate();
      })();*/
      }
      i++;
    }
  }
}
/*
Declaracion imss = 1
declaracion isr = 2
pago imss = 3
pago isr = 4
error = 0
*/

export async function uploadFile(file: File) {
  console.log('File name:', file.name);
}
