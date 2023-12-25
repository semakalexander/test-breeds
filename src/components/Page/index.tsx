import useBreedsState from "../../state/breeds";
import useMainState from "../../state/main";
import { Tab } from "../../types";
import Card from "../Card";
import "./page.sass";

const Page = () => {
  const selectedTab = useMainState((state) => state.selectedTab);
  const { breeds, favorites } = useBreedsState();

  const items = selectedTab === Tab.shop ? breeds : favorites;

  return (
    <div className="page">
      <h1 className="page-title">{selectedTab}</h1>

      <div className="breeds-grid">
        {items
          .filter((b) => b.selected && !b.hasChildren)
          .map((breed) => (
            <Card key={breed.id} breed={breed} />
          ))}
      </div>
    </div>
  );
};

export default Page;
