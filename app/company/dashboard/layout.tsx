'use client';
import { useSession } from 'next-auth/react';
import Dropdown from '@/app/ui/dashboard/dropdown';
import { años, meses } from '@/app/lib/placeholder-data';
import {
  useEffect,
  useState,
  useContext,
  createContext,
  Children,
} from 'react';
import { Data, Props } from '@/app/lib/definitions';
import { fetchRFC, fetchRS } from '@/app/lib/data';
import React from 'react';
import SideNav from '@/app/ui/dashboard/sidenav';
export const filters = createContext({
  rfc: '',
  ejercicio: '',
  periodo: '',
});
export default function Layout({ children }: { children: React.ReactNode }) {
  const [props, setProps] = useState<Props>({
    rfc: '',
    ejercicio: '',
    periodo: '',
  });
  const session = useSession();
  const user = session?.data?.user;
  const handleRfc = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.id == props.rfc) {
      setProps({ ...props, rfc: '' });
    } else {
      setProps({ ...props, rfc: e.currentTarget.id });
    }
  };
  const handleEjercicio = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.id == props.ejercicio) {
      setProps({ ...props, ejercicio: '' });
    } else {
      setProps({ ...props, ejercicio: e.currentTarget.id });
    }
  };
  const handlePeriodo = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.id == props.periodo) {
      setProps({ ...props, periodo: '' });
    } else {
      setProps({ ...props, periodo: e.currentTarget.id });
    }
  };
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchRS();
      if (response) {
        setData(response);
      }
    };
    fetch();
  }, []);
  return (
    <>
        <div className="flex w-full flex-col pl-5">
          <div className="flex w-[60vw] gap-4 pt-6">
            {session?.data?.user?.image === '1' ||
              (session?.data?.user?.image === '2' && (
                <Dropdown data={data} selected={props.rfc} handler={handleRfc}>
                  {props.rfc == '' && (
                    <span className="block w-full">Proveedor</span>
                  )}
                  {props.rfc != '' && (
                    <span className="block w-full font-bold">
                      {' '}
                      {props.rfc}{' '}
                    </span>
                  )}
                </Dropdown>
              ))}
            <Dropdown
              data={años}
              selected={props.ejercicio}
              handler={handleEjercicio}
            >
              {props.ejercicio == '' && (
                <span className="block w-full">Ejercicio</span>
              )}
              {props.ejercicio != '' && (
                <span className="block w-full font-bold">
                  {' '}
                  {props.ejercicio}{' '}
                </span>
              )}
            </Dropdown>
            <Dropdown
              data={meses}
              selected={props.periodo}
              handler={handlePeriodo}
            >
              {props.periodo == '' && (
                <span className="block w-full ">Periodo</span>
              )}
              {props.periodo != '' && (
                <span className="block w-full font-bold">
                  {' '}
                  {props.periodo}{' '}
                </span>
              )}
            </Dropdown>
          </div>
          <filters.Provider value={props}>
            <div className="w-full flex-grow md:overflow-y-auto ">
              {children}
            </div>
          </filters.Provider>
        </div>
    </>
  );
}
