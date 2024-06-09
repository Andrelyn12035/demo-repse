import FileLinks from '@/app/ui/documents/file-links';
import { Upload } from '@/app/ui/dashboard/upload';

export default async function Page({ params }: { params: { anio: string } }) {
  return (
    <>
      <Upload />
      <FileLinks />
    </>
  );
}
