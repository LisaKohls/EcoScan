import Header from '../../navigation/Header';
import BottomNavBar from '../../navigation/BottomNavBar';
import { Outlet } from 'react-router-dom';

const LayoutAuthed = () => {
  return (
    <>
      <Header title="TODO: change title accordingly" />
      <main>
        <Outlet />
      </main>
      <BottomNavBar />
    </>
  );
};

export default LayoutAuthed;
