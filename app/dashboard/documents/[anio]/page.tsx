import React from 'react';
import { meses } from '@/app/lib/placeholder-data';
import DirLinks from '@/app/ui/documents/dir-links';

export default function Page({params}: {params: {anio: string}}) {
  
  //tener un array de links que se actualice segun el directorio en el que se encuentre el usuario una variable de estado para el path del directorio y 
    return (
        <>
        <DirLinks links={meses}/>
        </>
    );
}
