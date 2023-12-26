import { create } from "zustand";
import { Breed } from "../types";

type BreedsState = {
  breeds: Breed[];
  favorites: Breed[];
  setBreeds: (breeds: Breed[]) => void;
  toggleBreed: (breed: Breed, isFavorite?: boolean) => void;
  selectAll: (isFavorite?: boolean) => void;
  deselectAll: (isFavorite?: boolean) => void;
  addToFavorites: (breed: Breed) => void;
  removeFromFavorites: (breed: Breed) => void;
  removeBreed: (breed: Breed) => void;
};

const useBreedsState = create<BreedsState>()((set) => ({
  breeds: [],
  favorites: [],
  setBreeds: (breeds) => set({ breeds }),
  toggleBreed: (breedToUpdate, isFavorite = false) =>
    set(({ breeds, favorites }) => {
      const items = isFavorite ? favorites : breeds;

      const breed = items.find((b) => b.id === breedToUpdate.id);
      const updatedBreeds = items.map((b) => {
        if (b.id === breed.id) return { ...b, selected: !b.selected };

        if (b.parentBreedId === breed.id) {
          return { ...b, selected: !breed.selected };
        }

        return b;
      });

      return {
        [isFavorite ? "favorites" : "breeds"]: updatedBreeds.map((breed) => {
          if (!breed?.hasChildren) return breed;

          const children = updatedBreeds.filter(
            (b) => b?.parentBreedId === breed.id
          );

          if (children.some((b) => b.selected))
            return { ...breed, selected: true };

          if (children.every((b) => !b.selected))
            return { ...breed, selected: false };

          return breed;
        }),
      };
    }),
  selectAll: (isFavorite = false) =>
    set(({ breeds, favorites }) => ({
      [isFavorite ? "favorites" : "breeds"]: (isFavorite
        ? favorites
        : breeds
      ).map((b) => ({
        ...b,
        selected: true,
      })),
    })),
  deselectAll: (isFavorite = false) =>
    set(({ breeds, favorites }) => ({
      [isFavorite ? "favorites" : "breeds"]: (isFavorite
        ? favorites
        : breeds
      ).map((b) => ({
        ...b,
        selected: false,
      })),
    })),
  addToFavorites: (breed) =>
    set(({ breeds, favorites: currentFavorites }) => {
      const isAlreadyAdded = currentFavorites.some((b) => b.id === breed.id);
      const isParentAlreadyAdded = currentFavorites.some(
        (b) => b.id === breed.parentBreedId
      );

      const favorites = [...currentFavorites];

      if (breed.parentBreedId && !isParentAlreadyAdded)
        favorites.push(breeds.find((b) => b.id === breed.parentBreedId));
      if (!isAlreadyAdded) favorites.push(breed);

      return { favorites };
    }),
  removeFromFavorites: (breed) =>
    set(({ favorites: currentFavorites }) => {
      const favorites = currentFavorites.filter((b) => b.id !== breed.id);

      if (
        favorites.some((b) => b.id === breed.parentBreedId) &&
        !favorites.some((b) => b.parentBreedId === breed.parentBreedId)
      )
        return {
          favorites: favorites.filter((b) => b.id !== breed.parentBreedId),
        };

      return {
        favorites,
      };
    }),
  removeBreed: (breed) =>
    set(({ breeds }) => {
      const breedToRemove = breeds.find((b) => b.id === breed.id);
      const updatedBreeds = breeds.filter((b) => b.id !== breedToRemove.id);

      const isParentEmpty =
        breed.parentBreedId &&
        !updatedBreeds.some((b) => b.parentBreedId === breed.parentBreedId);

      return {
        breeds: isParentEmpty
          ? updatedBreeds.filter((b) => b.id !== breedToRemove.parentBreedId)
          : updatedBreeds,
      };
    }),
}));

export default useBreedsState;
