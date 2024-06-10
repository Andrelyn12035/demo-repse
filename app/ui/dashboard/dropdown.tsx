'use client';
import { periodo, Data } from '@/app/lib/definitions';
import { useState } from 'react';
interface DropdownProps {
  data: Data[] | periodo[];
  handler: (e: React.MouseEvent<HTMLLIElement>) => void;
  children?: React.ReactNode;
}
export default function Dropdown({ data, handler, children }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="w-full ">
      <button
        className="hover:border-primary relative flex w-full cursor-pointer items-center  justify-between rounded border border-[#828FA340] px-1 py-2 "
        onClick={toggleDropdown}
      >
        <span className="block w-full">{children}</span>
        {isDropdownOpen && (
          <div className="absolute bottom-full top-full w-full translate-y-5 rounded border-[#3b424d]  bg-[#575761]">
            <ul className="flex flex-col  rounded ">
              {data.map((value, index) => (
                <li
                  key={index}
                  id={value.name}
                  className={`flex items-center gap-2 rounded p-2 hover:border hover:border-[#9fa0a8] hover:bg-[#cfd0da]`}
                  onClick={handler}
                >
                  <span>{value.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </button>
    </div>
  );
}
