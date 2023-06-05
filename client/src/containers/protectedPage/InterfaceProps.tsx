export interface Info {
  img: string;
  name: string;
  lifetimeIndex: number;
  waterIndex: number;
  socialIndex: number;
  ecologicalIndex: number;
}
export interface Title {
  title: string;
}

export interface Values {
  index: number;
  title: string;
}

export interface Result {
  results: [
    {
      barcode: string;
      categories: [string];
      name: string;
      description: string;
      imageUrls: [string];
      sustainabilityName: string;
      sustainabilityEco: number;
      sustainabilitySocial: number;
    }
  ];
}

export interface PopUpProps {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  children: React.ReactNode;
}
