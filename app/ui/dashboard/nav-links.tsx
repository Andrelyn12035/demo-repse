'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  FolderOpenIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { fetchUsers } from '@/app/lib/data';
import { ProveedoresTableType } from '@/app/lib/definitions';
import { link } from 'fs';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
let links = [
];

export default function NavLinks({ role }: { role: boolean }) {
  const pathname = usePathname();
  console.log('role: ' + role);

  if (!role) {
    links = [
      { name: 'Home', href: '/dashboard', icon: HomeIcon },
      {
        name: 'Documentos',
        href: '/dashboard/documents',
        icon: DocumentDuplicateIcon,
      },
    ];
  } else {
    links = [
      { name: 'Home', href: '/dashboard', icon: HomeIcon },
      {
        name: 'Documentos',
        href: '/dashboard/documents',
        icon: DocumentDuplicateIcon,
      },
      {
        name: 'Proveedores',
        href: '/dashboard/proveedores',
        icon: UserGroupIcon,
      },
    ];
  }
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
