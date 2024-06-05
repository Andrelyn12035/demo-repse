'use client';
import React from 'react';
import {
  FolderOpenIcon
} from '@heroicons/react/24/outline';
import { años, meses } from '@/app/lib/placeholder-data';
import DirLinks from '@/app/ui/documents/dir-links';
import { useState, useEffect } from 'react';
import { periodo } from '@/app/lib/definitions';
import { Upload } from '@/app/ui/dashboard/upload';

const an = [ "2021", "2022", "2023", "2024"];
const me = [ "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

export default function Page() {
  const [path, setPath] = useState<string []>([]);
  const [links, setLinks] = useState(años);
  const [component, setComponent] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    if (an.includes(id)) {
      setPath([...path, id]);
      setLinks(meses);
    }else if(me.includes(id)){
      setPath([...path, id]);
      setComponent(true);
    }
    console.log(id);
    console.log(path);
  }
  
  //tener un array de links que se actualice segun el directorio en el que se encuentre el usuario una variable de estado para el path del directorio y 
  return (
    <>
    <h1 className='mb-2'>{path.map((dir)=>{
    return (dir+"/")
    })}</h1>
    {component ? <Upload />:
    <DirLinks links={links} handleClick={handleClick}/>
    }
    </>
    

);
}
