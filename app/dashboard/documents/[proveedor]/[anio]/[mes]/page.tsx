'use client';
import React, { use } from 'react';
import { fetchFiles } from '@/app/lib/data';
import { usePathname } from 'next/navigation';
import path from 'path';
import { Upload } from '@/app/ui/dashboard/upload';
import { tipos } from '@/app/lib/placeholder-data';
import DirLinks from '@/app/ui/documents/dir-links';

export default function Page({ params }: { params: { anio: string } }) {
  //tener un array de links que se actualice segun el directorio en el que se encuentre el usuario una variable de estado para el path del directorio y
  return (
    <>
      <DirLinks links={tipos} />
    </>
  );
}
