import clsx from "clsx";
import classes from "./styles.module.scss";

export interface TabObject {
  id: string;
  title: string;
  icon?: any;
}
interface ITabsClassNames {
  rootClassName?: string;
  tabClassName?: string;
}
export interface ITabsPropsAsync extends ITabsClassNames {
  selected: string;
  tabs: TabObject[];
  type: "async";
  beforeChange: () => Promise<any>;
  onChange: (tab: TabObject, data: any) => void;
  disabledTabs?: string[];
}

export interface ITabsPropsDefault extends ITabsClassNames {
  selected: string;
  tabs: TabObject[];
  type: "sync";
  beforeChange?: () => any;
  onChange: (tab: TabObject, data: any) => void;
  disabledTabs?: string[];
}

// tab button component
function Tabs({
  tabs,
  selected,
  onChange,
  type,
  beforeChange,
  disabledTabs,
  rootClassName,
  tabClassName,
}: ITabsPropsDefault | ITabsPropsAsync) {
  // tab change handle
  let tabFunction = async (tab: TabObject) => {
    let result: any;
    if (type === "async") {
      result = await beforeChange();
    } else if (!!beforeChange) {
      result = beforeChange();
    }

    onChange(tab, result);
  };
  // render component
  return (
    <div className={clsx([classes.tabsRoot, rootClassName])}>
      {tabs.map(({ icon: Icon, ...tab }) => {
        const isTabDisabled = disabledTabs?.some((tabId) => tabId === tab.id);
        return (
          <div
            key={tab.id}
            className={clsx([classes.tab, tabClassName])}
            data-is-selected={selected === tab.id}
            data-disabled={isTabDisabled}
            onClick={() => !isTabDisabled && tabFunction(tab)}
          >
            {!!Icon && <Icon className={classes.icon} />}
            {tab.title}
          </div>
        );
      })}
    </div>
  );
}

Tabs.defaultProps = {
  type: "sync",
};

export default Tabs;
