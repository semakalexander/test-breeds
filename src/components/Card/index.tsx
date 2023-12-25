import classNames from "classnames";
import { FunctionalComponent } from "preact";
import useBreedsState from "../../state/breeds";
import { Breed } from "../../types";
import Button from "../Button";
import HeartIcon from "../icons/Heart";
import "./card.sass";

const Card: FunctionalComponent<{
  breed: Breed;
}> = ({ breed }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useBreedsState();

  const addedToFavorites = favorites.some((b) => b.id === breed.id);

  return (
    <div className="breed-card">
      <span className="breed-card-title">{breed.fullName || breed.name}</span>

      <img src={breed.imgSrc} />

      <Button
        className="breed-card-fav-button"
        onClick={() =>
          addedToFavorites ? removeFromFavorites(breed) : addToFavorites(breed)
        }
      >
        <HeartIcon
          width="24"
          height="24"
          className={classNames({ active: addedToFavorites })}
        />
        <span>{`${
          addedToFavorites ? "remove from" : "add to"
        } favorites`}</span>
      </Button>
    </div>
  );
};

export default Card;
