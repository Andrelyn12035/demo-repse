'use client';
import {
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fileInfo } from '@/app/lib/definitions';

type FileLinksProps = {
    links: fileInfo[];
  };

export default function FileLinks( { links }: FileLinksProps){
    return (
        <>
        {links.map((link) => {
            return (
            <Link
                key={link.name}
                id={link.name}
                href={link.link}
                className='flex gap-2 hover:bg-gray-100 hover:text-blue-600 p-2 w-1/2 mt-3'
                >
                <DocumentCheckIcon className="h-6 w-6" />
                <p className="hidden md:block">{link.name}</p>
            </Link>
            );
        })}
        </>
    );
}
