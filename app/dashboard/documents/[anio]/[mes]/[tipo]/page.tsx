import FileLinks from '@/app/ui/documents/file-links';
import { Upload } from '@/app/ui/dashboard/upload';
import { auth } from '@/auth';
export default async function Page({ params }: { params: { anio: string } }) {
  const session = await auth();
  let role = false;
  console.log('role', role);
  if (session?.user?.image === '1' || session?.user?.image === '2') {
    role = true;
  }
  return (
    <>
      <Upload role={role} />
      <FileLinks />
    </>
  );
}
