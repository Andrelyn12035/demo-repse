'use client';
import { periodo, Data } from '@/app/lib/definitions';
import { useState } from 'react';
interface DropdownProps {
  data: Data[] | periodo[];
  selected: string;
  handler: (e: React.MouseEvent<HTMLLIElement>) => void;
  children?: React.ReactNode;
}
export default function Dropdown({ data, handler, selected, children }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    handler(e);
    setIsDropdownOpen(!isDropdownOpen);
  }
  return (
    <div className="w-full ">
      <button
        className="hover:border-primary relative flex w-full cursor-pointer items-center  justify-between rounded border border-[#828FA340] px-1 py-2 "
        onClick={toggleDropdown}
      >
        {children}
        {isDropdownOpen && (
          <div className="absolute bottom-full top-full w-full translate-y-5 rounded border-[#3b424d]  ">
            <ul className="flex flex-col rounded bg-white">
              {data.map((value, index) => (
                <li
                  key={index}
                  id={value.name}
                  className={`flex items-center ${value.name === selected ? 'font-bold' : ''} gap-2 rounded p-2 hover:border hover:border-[#9fa0a8] hover:bg-[#cfd0da]`}
                  onClick={handleClick}
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
