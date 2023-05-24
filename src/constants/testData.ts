import {TabObject} from "components/core/tabs";
import {AddSquareLinear, LocationBold} from "components/icon";

export const TAB_ITEMS: TabObject[] = [
  { id: "1", title: "inbox" },
  { id: "2", title: "sent" },
];

export const ICON_TAB_ITEMS: TabObject[] = [
  { id: "1", title: "inbox", icon: LocationBold },
  { id: "2", title: "sent", icon: AddSquareLinear },
];
