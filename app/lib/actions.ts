'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { fetchDecIMSS } from './data';
import { get } from 'http';
import { File } from './definitions';
import { Console } from 'console';
// ...

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
  console.log('Files:', files.entries);
  for (const file of files) {
    console.log('File:', file);
    //uploadFile(file as File);
  }
}

export async function uploadFile(file: File) {
  console.log('File name:', file.name);
}
