import type { Breed } from "./types";

export async function fetcher<Data = any>(url: string): Promise<Data> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: Data = await response.json();
  return data;
}

export const keys = <T extends object>(data: T) =>
  Object.keys(data) as Array<keyof T>;

export const sortBreeds = (breeds: Breed[]) => {
  const group = breeds
    .filter((b) => !b.parentBreedId)
    .reduce<{ parent: Breed; children: Breed[] }[]>(
      (acc, parent) => [
        ...acc,
        {
          parent,
          children: breeds.filter((b) => b.parentBreedId === parent.id),
        },
      ],
      []
    );

  return group.reduce<Breed[]>(
    (acc, group) => [...acc, group.parent, ...group.children],
    []
  );
};
