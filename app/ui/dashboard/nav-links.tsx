'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

let links = [];

export default function NavLinks({ role }: { role: boolean }) {
  const pathname = usePathname();
  console.log('role: ' + role);

  if (!role) {
    links = [
      { name: 'Controles generales', href: '/dashboard', icon: HomeIcon },
      {
        name: 'Declaraciones federales y pago',
        href: '/dashboard/federales',
        icon: HomeIcon,
      },
      {
        name: 'Declaraciones seguridad social y pago',
        href: '/dashboard/imss',
        icon: HomeIcon,
      },
      { name: 'Recibos de nómina', href: '/dashboard/nomina', icon: HomeIcon },
      {
        name: 'Complementos de pago pendientes',
        href: '/dashboard/complemento',
        icon: HomeIcon,
      },
      {
        name: 'Tableau',
        href: '/dashboard/tableau',
        icon: HomeIcon,
      },
      {
        name: 'PowerBI',
        href: '/dashboard/powerbi',
        icon: HomeIcon,
      },
      {
        name: 'Documentos',
        href: '/dashboard/documents',
        icon: DocumentDuplicateIcon,
      },
    ];
  } else {
    links = [
      { name: 'Controles generales', href: '/dashboard', icon: HomeIcon },
      {
        name: 'Declaraciones federales y pago',
        href: '/dashboard/federales',
        icon: HomeIcon,
      },
      {
        name: 'Declaraciones seguridad social y pago',
        href: '/dashboard/imss',
        icon: HomeIcon,
      },
      { name: 'Recibos de nómina', href: '/dashboard/nomina', icon: HomeIcon },
      {
        name: 'Complementos de pago pendientes ',
        href: '/dashboard/complemento',
        icon: HomeIcon,
      },
      {
        name: 'Tableau',
        href: '/dashboard/tableau',
        icon: HomeIcon,
      },
      {
        name: 'PowerBI',
        href: '/dashboard/powerbi',
        icon: HomeIcon,
      },
      {
        name: 'Documentos',
        href: '/dashboard/documentsAdmin',
        icon: DocumentDuplicateIcon,
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
