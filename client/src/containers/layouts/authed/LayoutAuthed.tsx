import Header from '../../navigation/Header';
import BottomNavBar from '../../navigation/BottomNavBar';
import { ReactNode } from 'react';

const LayoutAuthed = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header title="TODO: change title accordingly" />
      <main>{children}</main>
      <BottomNavBar />
    </>
  );
};

export default LayoutAuthed;
