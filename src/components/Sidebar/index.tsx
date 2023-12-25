import classNames from "classnames";
import { FunctionalComponent } from "preact";
import useBreedsState from "../../state/breeds";
import useMainState from "../../state/main";
import { Tab } from "../../types";
import { sortBreeds } from "../../utils";
import Button from "../Button";
import "./sidebar.sass";

const ListItem: FunctionalComponent<{
  name: string;
  selected: boolean;
  className?: string;
  onClick: () => void;
}> = ({ name, selected, className = "", onClick }) => {
  return (
    <li
      className={classNames({ selected, [className]: !!className })}
      onClick={onClick}
    >
      {name}
    </li>
  );
};

const Sidebar = () => {
  const selectedTab = useMainState((state) => state.selectedTab);
  const { breeds, favorites, selectAll, toggleBreed, deselectAll } =
    useBreedsState();

  const items = sortBreeds(selectedTab === Tab.shop ? breeds : favorites);
  const isFavorite = selectedTab === Tab.favorites;

  return (
    <aside className="sidebar">
      <div className="actions">
        <Button onClick={() => selectAll(isFavorite)}>Select All</Button>
        <Button onClick={() => deselectAll(isFavorite)}>Deselect All</Button>
      </div>

      <ul className="list">
        {items.map((breed) => (
          <>
            <ListItem
              name={breed.name}
              selected={breed.selected}
              className={breed.parentBreedId ? "subitem" : ""}
              onClick={() => toggleBreed(breed, isFavorite)}
            />
          </>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
