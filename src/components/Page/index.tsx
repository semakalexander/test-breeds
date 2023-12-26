import useBreedsState from "../../state/breeds";
import useMainState from "../../state/main";
import { Tab } from "../../types";
import Card from "../Card";
import "./page.sass";

const Page = () => {
  const selectedTab = useMainState((state) => state.selectedTab);
  const { breeds, favorites } = useBreedsState();

  const items = (selectedTab === Tab.shop ? breeds : favorites).filter(
    (b) => b.selected && !b.hasChildren
  );

  return (
    <div className="page">
      <h1 className="page-title">{selectedTab}</h1>

      {!items.length && (
        <p className="page-info">Selected breeds will be shown here</p>
      )}

      <div className="breeds-grid">
        {items.map((breed) => (
          <Card key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
};

export default Page;
