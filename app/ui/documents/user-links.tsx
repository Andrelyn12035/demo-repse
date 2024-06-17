'use client';
import { FolderOpenIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, periodo } from '@/app/lib/definitions';
import { useContext, useEffect, useState } from 'react';
import { fetchProveedores } from '@/app/lib/data';
import { idContext } from '@/app/company/dashboard/documentsAdmin/idContextProvider';

export default function UserLinks() {
  const pathname = usePathname();
  const { id, setId } = useContext(idContext) || { id: '', setId: () => {} };
  const [Users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchProveedores();
      if (response) {
        setUsers(response);
        console.log(response);
      }
    };
    fetch();
  }, []);
  const handleContext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.id;
    setId(id);
  };
  return (
    <>
      {Users.map((user) => {
        return (
          <Link
            key={user.rfc}
            id={user.id}
            href={pathname + '/' + user.rfc}
            className="flex w-1/2 gap-2 p-2 hover:bg-gray-100 hover:text-blue-600"
            onClick={handleContext}
          >
            <FolderOpenIcon className="h-6 w-6" />
            <p className="hidden md:block">{user.rfc}</p>
          </Link>
        );
      })}
    </>
  );
}
