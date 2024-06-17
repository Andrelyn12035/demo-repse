'use client';
import Breadcrumbs from '@/app/ui/documents/breadcrumbs';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface Breadcrumb {
  name: string;
  href: string;
  active?: boolean;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [context, setContext] = useState('');
  let bread = pathname.split('/');
  bread.shift();
  bread.shift();
  let breadcrumbs: Breadcrumb[] = [];
  let path = '/dashboard/';
  bread.map((crumb, index) => {
    path = path + crumb + '/';
    if (index === bread.length - 1) {
      if (crumb === 'documents') {
        breadcrumbs.push({ name: 'Documents', href: path, active: true });
      } else {
        breadcrumbs.push({
          name: crumb.replace('%20', ' '),
          href: path,
          active: true,
        });
      }
    } else {
      if (crumb === 'documents') {
        breadcrumbs.push({ name: 'Documents', href: path, active: false });
      } else {
        breadcrumbs.push({
          name: crumb.replace('%20', ' '),
          href: path,
          active: false,
        });
      }
    }
  });
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="w-full">{children}</div>
    </>
  );
}
