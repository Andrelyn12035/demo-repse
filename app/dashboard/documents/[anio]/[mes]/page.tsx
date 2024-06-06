'use client';
import React, { use } from 'react';
import FileLinks from '@/app/ui/documents/file-links';
import { fetchFiles } from '@/app/lib/data'; 
import { usePathname } from 'next/navigation';
import path from 'path';
import { Upload } from '@/app/ui/dashboard/upload';
const links = [
    {name: 'file1', link: 'link1'},
    {name: 'file2', link: 'link2'},
    {name: 'file3', link: 'link3'},
    {name: 'file4', link: 'link4'},
    {name: 'file5', link: 'link5'},
]

export default function Page({params}: {params: {anio: string}}) {
    const pathname = usePathname();
    const files = fetchFiles(pathname);
    console.log(files);
  //tener un array de links que se actualice segun el directorio en el que se encuentre el usuario una variable de estado para el path del directorio y 
    return (
        <>
        <Upload />
        <FileLinks links={links} />
        </>
    );
}
