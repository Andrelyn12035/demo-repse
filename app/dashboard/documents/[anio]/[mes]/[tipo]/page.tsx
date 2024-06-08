import FileLinks from '@/app/ui/documents/file-links';
import { Upload } from '@/app/ui/dashboard/upload';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { anio: string } }) {
  return (
    <>
      <Upload />
      <FileLinks />
    </>
  );
}
