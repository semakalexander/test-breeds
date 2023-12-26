import useMainState from "../../state/main";
import { Tab } from "../../types";
import Button from "../Button";
import CloseIcon from "../icons/Close";
import MenuIcon from "../icons/Menu";
import "./header.sass";

const Header = () => {
  const { selectedTab, isMobileSidebarOpened, selectTab, toggleMobileSidebar } =
    useMainState();

  return (
    <div className="header">
      <Button
        className="header-menu-button"
        onClick={() => toggleMobileSidebar()}
      >
        {isMobileSidebarOpened ? <CloseIcon /> : <MenuIcon />}
      </Button>
      <div className="header-actions">
        {Object.values(Tab).map((tab) => (
          <Button onClick={() => selectTab(tab)} active={selectedTab === tab}>
            {tab}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Header;
