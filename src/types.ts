export type Breed = {
  id: string;
  name: string;
  selected: boolean;
  parentBreedId: Breed["id"] | null;
  fullName?: string;
  imgSrc?: string;
  hasChildren?: boolean;
};

export enum Tab {
  shop = "shop",
  favorites = "favorites",
}
