export interface SearchResultsProps {
  searchResults:
    | [
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
      ]
    | [];
}