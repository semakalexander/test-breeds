import { create } from "zustand";
import { Tab } from "../types";

type MainState = {
  selectedTab: Tab;
  selectTab: (tab: Tab) => void;
};

const useMainState = create<MainState>()((set) => ({
  selectedTab: Tab.shop,
  selectTab: (tab: Tab) => set({ selectedTab: tab }),
}));

export default useMainState;
