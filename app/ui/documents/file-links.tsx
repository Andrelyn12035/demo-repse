'use client';
import { DocumentCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fileData, fileInfo } from '@/app/lib/definitions';
import { useContext, useEffect, useState } from 'react';
import { fetchFiles } from '@/app/lib/data';
import { idContext } from '@/app/dashboard/documentsAdmin/idContextProvider';

type FileLinksProps = {
  links: fileData[];
};

export default function FileLinks() {
  const pathname = usePathname();
  const { id, setId } = useContext(idContext) || { id: '', setId: () => {} };
  console.log('id', id);
  const [files, setFiles] = useState<fileData[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchFiles(pathname, id);
      if (response) {
        setFiles(response);
        console.log(response);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {files.map((link, index) => {
        return (
          <Link
            key={index}
            id={link.name}
            href="#"
            className="mt-3 flex w-1/2 gap-2 p-2 hover:bg-gray-100 hover:text-blue-600"
          >
            <DocumentCheckIcon className="h-6 w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
