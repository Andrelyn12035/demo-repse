import { años } from '@/app/lib/placeholder-data';
import DirLinks from '@/app/ui/documents/dir-links';

export default function Page({ params }: { params: { anio: string } }) {
  return (
    <>
      <DirLinks links={años} />
    </>
  );
}
