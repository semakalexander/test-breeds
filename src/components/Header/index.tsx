import useMainState from "../../state/main";
import { Tab } from "../../types";
import Button from "../Button";
import "./header.sass";

const Header = () => {
  const { selectedTab, selectTab } = useMainState();

  return (
    <div className="header">
      {Object.values(Tab).map((tab) => (
        <Button onClick={() => selectTab(tab)} active={selectedTab === tab}>
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default Header;
