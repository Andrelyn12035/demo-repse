import React from 'react';
import { años } from '@/app/lib/placeholder-data';
import DirLinks from '@/app/ui/documents/dir-links';

export default async function Page() {
  return <DirLinks links={años} />;
}
