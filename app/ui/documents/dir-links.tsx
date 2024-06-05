'use client';
import {
  FolderOpenIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { fetchUsers } from '@/app/lib/data';
import { ProveedoresTableType } from '@/app/lib/definitions';
import { link } from 'fs';
import { periodo } from '@/app/lib/definitions';

type DirLinksProps = {
    links: periodo[];
    handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  };

export default function DirLinks( { links, handleClick }: DirLinksProps){
    const pathname = usePathname();


  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            id={link.name}
            href="#"
            className='flex gap-2 hover:bg-gray-100 hover:text-blue-600 p-2 w-1/2'
            onClick={handleClick}
            >
            <FolderOpenIcon className="h-6 w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
