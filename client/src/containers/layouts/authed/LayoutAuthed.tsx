import Header from '../../navigation/Header';
import BottomNavBar from '../../navigation/BottomNavBar';
import { ReactNode } from 'react';

const LayoutAuthed = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-white to-secondary-light">
      <Header />
      <main className="flex-grow overflow-x-hidden overflow-y-auto whitespace-nowrap">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default LayoutAuthed;
