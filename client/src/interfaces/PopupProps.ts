import { ReactNode } from 'react';

export interface PopUpProps {
  children: ReactNode;
  trigger: boolean;
  setTrigger: (value: boolean) => void;
}
