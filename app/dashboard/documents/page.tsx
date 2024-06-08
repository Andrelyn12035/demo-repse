import React from 'react';
import { años, proveedores } from '@/app/lib/placeholder-data';
import DirLinks from '@/app/ui/documents/dir-links';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  const role = session?.user?.name as string;
  let links;
  if (role != '3') {
    links = <DirLinks links={proveedores} />;
  } else {
    links = <DirLinks links={años} />;
  }
  return links;
}
