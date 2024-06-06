'use client';
import {
  FolderOpenIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { periodo } from '@/app/lib/definitions';

type DirLinksProps = {
    links: periodo[];
  };

export default function DirLinks( { links }: DirLinksProps){
    const pathname = usePathname();
    const handlePath = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        console.log(e.currentTarget.id);
    }
    return (
        <>
        {links.map((link) => {
            return (
            <Link
                key={link.name}
                id={link.name}
                href={pathname + '/' + link.name}
                className='flex gap-2 hover:bg-gray-100 hover:text-blue-600 p-2 w-1/2'
                onClick={handlePath}
                >
                <FolderOpenIcon className="h-6 w-6" />
                <p className="hidden md:block">{link.name}</p>
            </Link>
            );
        })}
        </>
    );
}
