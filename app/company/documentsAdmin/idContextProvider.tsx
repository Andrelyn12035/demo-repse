import { createContext, useState } from 'react';
export const idContext = createContext<{
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export default function IdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [id, setId] = useState('');
  return (
    <idContext.Provider value={{ id, setId }}>{children}</idContext.Provider>
  );
}
