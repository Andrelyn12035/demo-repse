'use client';
import React, { useEffect, useState } from 'react';
import { tipos } from '@/app/lib/placeholder-data';
import DirLinks from '@/app/ui/documents/dir-links';
import FileLinks from '@/app/ui/documents/file-links';
import { Upload } from '@/app/ui/dashboard/upload';
import { usePathname } from 'next/navigation';
import { fetchFiles } from '@/app/lib/data';
import { fileData } from '@/app/lib/definitions';

const links = [
  { name: 'file1', link: 'link1' },
  { name: 'file2', link: 'link2' },
  { name: 'file3', link: 'link3' },
  { name: 'file4', link: 'link4' },
  { name: 'file5', link: 'link5' },
];

export default function Page({ params }: { params: { anio: string } }) {
  const pathname = usePathname();
  const [files, setFiles] = useState<fileData[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchFiles(pathname);
      if (response) {
        setFiles(response);
        console.log(response);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Upload />
      <FileLinks links={files} />
    </>
  );
}
