import React from 'react';
import Logo from '../../assets/logo.png';

export interface Size {
  sizing: string;
}
const LeaveLogo: React.FC<Size> = props => {
  return (
    <div className="flex justify-center my-4">
      <img src={Logo} alt="leave_logo" className={props.sizing} />
    </div>
  );
};

export default LeaveLogo;
