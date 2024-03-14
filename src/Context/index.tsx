
import { createContext } from 'react';
import { DocumentContextType, Session } from '~/types';

type Props = {
  children?: React.ReactNode

  collections: string[]
  pages: string[]
  addPage: (page: string) => void
  removePage: (page: string) => void
}

export const CMSContext = createContext({
 
 
} as Omit<Props, 'client'>)

export const CMSProvider = ({
  children,
 
  collections,
  pages,
  addPage,
  removePage
}: Props) => {
  return (
    <CMSContext.Provider
      value={{
        collections,
        pages,
        addPage,
        removePage
      }}
    >
      {children}
    </CMSContext.Provider>
  )
}

export const DocumentContext = createContext<DocumentContextType>(
  {} as DocumentContextType
);