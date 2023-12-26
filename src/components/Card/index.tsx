import classNames from "classnames";
import { FunctionComponent } from "preact";
import useBreedsState from "../../state/breeds";
import { Breed } from "../../types";
import Button from "../Button";
import HeartIcon from "../icons/Heart";
import "./card.sass";

const Card: FunctionComponent<{
  breed: Breed;
}> = ({ breed }) => {
  const { favorites, addToFavorites, removeFromFavorites, removeBreed } =
    useBreedsState();

  const addedToFavorites = favorites.some((b) => b.id === breed.id);

  return (
    <div className="breed-card">
      <span className="breed-card-title">{breed.fullName || breed.name}</span>

      <img
        src={breed.imgSrc}
        onError={() => {
          removeBreed(breed);
        }}
      />

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
