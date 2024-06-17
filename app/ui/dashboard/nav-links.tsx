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

  if (!role) {
    links = [
      {
        name: 'Controles generales',
        href: '/company/dashboard',
        icon: HomeIcon,
      },
      {
        name: 'Declaraciones federales y pago',
        href: '/company/dashboard/federales',
        icon: HomeIcon,
      },
      {
        name: 'Declaraciones seguridad social y pago',
        href: '/company/dashboard/imss',
        icon: HomeIcon,
      },
      {
        name: 'Recibos de nómina',
        href: '/company/dashboard/nomina',
        icon: HomeIcon,
      },
      {
        name: 'Complementos de pago pendientes',
        href: '/company/dashboard/complemento',
        icon: HomeIcon,
      },
      {
        name: 'PowerBI',
        href: '/company/powerbi',
        icon: HomeIcon,
      },
      {
        name: 'Documentos',
        href: '/company/documents',
        icon: DocumentDuplicateIcon,
      },
    ];
  } else {
    links = [
      {
        name: 'Controles generales',
        href: '/company/dashboard',
        icon: HomeIcon,
      },
      {
        name: 'Declaraciones federales y pago',
        href: '/company/dashboard/federales',
        icon: HomeIcon,
      },
      {
        name: 'Declaraciones seguridad social y pago',
        href: '/company/dashboard/imss',
        icon: HomeIcon,
      },
      {
        name: 'Recibos de nómina',
        href: '/company/dashboard/nomina',
        icon: HomeIcon,
      },
      {
        name: 'Complementos de pago pendientes ',
        href: '/company/dashboard/complemento',
        icon: HomeIcon,
      },
      {
        name: 'PowerBI',
        href: '/company/powerbi',
        icon: HomeIcon,
      },
      {
        name: 'Documentos',
        href: '/company/documentsAdmin',
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
            {link.icon === DocumentDuplicateIcon && (
              <LinkIcon className="w-6" />
            )}

            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
