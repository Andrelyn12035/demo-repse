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
      let imgBuffer = buffer;
      if (fileType === '.pdf') {
        const base64Str = await pdfToIMG(buffer);
        imgBuffer = Buffer.from(base64Str, 'base64');
      }
      const worker = await createWorker('spa', 1, {
        workerPath:
          './node_modules/tesseract.js/src/worker-script/node/index.js',
      });
      const {
        data: { text },
      } = await worker.recognize(imgBuffer);
      console.log('Text:', text.toUpperCase());
      const type = classifyText(text.toUpperCase());
      console.log('Type:', type);
      switch (type) {
        case 1:
          readDecIMSS(imgBuffer, file.name);
          break;
        case 2:
          readDecISR(imgBuffer, file.name);
          break;
        case 3:
          readPagoIMSS(imgBuffer, file.name);
          break;
        case 4:
          readPagoISR(imgBuffer, file.name);
          break;
        default:
          break;
      }
      await worker.terminate();
    }
    i++;
  }
}

/*
Declaracion imss = 1
declaracion isr = 2
pago imss = 3
pago isr = 4
error = 0
*/
