export interface InterfaceProps {
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
