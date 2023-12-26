import { create } from "zustand";
import { Tab } from "../types";

type MainState = {
  selectedTab: Tab;
  isMobileSidebarOpened: boolean;
  selectTab: (tab: Tab) => void;
  toggleMobileSidebar: (state?: boolean) => void;
};

const useMainState = create<MainState>()((set) => ({
  selectedTab: Tab.shop,
  isMobileSidebarOpened: false,
  selectTab: (tab: Tab) => set({ selectedTab: tab }),
  toggleMobileSidebar: (state) =>
    set(({ isMobileSidebarOpened }) => ({
      isMobileSidebarOpened:
        state === undefined ? !isMobileSidebarOpened : state,
    })),
}));

export default useMainState;
