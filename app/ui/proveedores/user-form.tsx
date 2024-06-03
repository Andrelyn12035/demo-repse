import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  BuildingOffice2Icon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { createUser } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function Form() {
  return (
    <form action={createUser}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="Rs" className="mb-2 block text-sm font-medium">
            Razon social
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="Rs"
                name="Rs"
                type="text"
                placeholder="Ingresar Razon social"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-light">Accesos</legend>
          <div className="mb-4">
            <label htmlFor="rfc" className="mb-2 block text-sm font-medium">
              RFC
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="rfc"
                  name="rfc"
                  type="text"
                  placeholder="Ingresar RFC"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Contraseña
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Create usuario</Button>
      </div>
    </form>
  );
}
