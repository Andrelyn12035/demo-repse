import FileLinks from '@/app/ui/documents/file-links';
import { Upload } from '@/app/ui/dashboard/upload';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { anio: string } }) {
  const session = await auth();
  let role = false;
  if (session?.user) {
    console.log('session: ' + JSON.stringify(session.user));
    if (session?.user?.image === '1' || session?.user?.image === '2') {
      role = true;
    }
  }
  return (
    <>
      <Upload role={role} />
      <FileLinks />
    </>
  );
}
