import { redirect } from 'next/navigation';

export default function Page() {
  redirect(`/company/dashboard`);
  return <h1></h1>;
}
