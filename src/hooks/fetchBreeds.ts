import { v4 as uuidv4 } from "uuid";

import { useCallback, useEffect, useState } from "preact/hooks";
import useBreedsState from "../state/breeds";
import { Breed } from "../types";
import { keys } from "../utils";

type BreedResponse = {
  message?: Record<string, string[]>;
  status?: string;
};

type BreedImageResponse = {
  message?: string;
  status?: string;
};

const BREEDS_BASE_API = "https://dog.ceo/api";

const fetchBreeds = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { setBreeds } = useBreedsState();

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BREEDS_BASE_API}/breeds/list/all`);
      const data = (await response.json()) as BreedResponse;

      if (data.status !== "success") throw new Error("Something went wrong :(");

      const breeds = keys(data.message).reduce((acc, breedName) => {
        const mainBreed: Omit<Breed, "imgSrc"> = {
          id: uuidv4(),
          name: breedName,
          fullName: breedName,
          parentBreedId: null,
          selected: true,
          hasChildren: !!data.message[breedName].length,
        };

        const subBreeds: Omit<Breed, "imgSrc">[] = data.message[breedName].map(
          (subBreedName) => ({
            id: uuidv4(),
            name: subBreedName,
            fullName: `${breedName} ${subBreedName}`,
            parentBreedId: mainBreed.id,
            selected: true,
          })
        );

        return [...acc, mainBreed, ...subBreeds];
      }, [] as Omit<Breed, "imgSrc">[]);

      const result: (Breed | null)[] = await Promise.all(
        breeds.map(async (breed) => {
          if (breed.hasChildren) return breed;

          const res = await fetch(
            `${BREEDS_BASE_API}/breed/${
              breed.fullName ? breed.fullName.split(" ").join("/") : breed.name
            }/images/random`
          );
          const imageResponse = (await res.json()) as BreedImageResponse;

          if (!imageResponse.message || imageResponse.status !== "success")
            return null;

          return { ...breed, imgSrc: imageResponse.message };
        })
      );

      setBreeds(result.filter((b) => !!b));
    } catch (err) {
      console.log("err :>> ", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    isLoading,
    error,
  };
};

export default fetchBreeds;
