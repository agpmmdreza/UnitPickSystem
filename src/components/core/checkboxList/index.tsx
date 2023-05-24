import Checkbox from "../checkbox";
import RadioButton from "../radioButton";
import styles from "./styles.module.scss";

// checkboxList's types which determines type of button's
type CheckboxType = "checkbox" | "radio";

/**
 * we have two type for this list:
 * 1. we could select items from one general group -> SimpleItem
 * 2. we have multiple sub-groups which each group has on items and we could select among of them -> ComplexItem
 */
type ComplexItem = {
  title: string;
  list: string[];
  selected: string;
};
type SimpleItem = string;
type ListOfItems = ComplexItem[] | SimpleItem[];
/**
 * list interface represents a general interface for list
 * @param list: union of complex and simple structure for list
 * @param chosenItems: list of selected items from list that we are receiving in the first place
 * @param type: checkbox's type which is radio or checkbox
 * @param clickable: determines that our list is selectable or not
 * @param onChangeItem: a function that get fired when an item get selected
 */
interface ListInterface {
  list: ListOfItems;
  chosenItems?: ISelectedItem[];
  type?: CheckboxType;
  clickable?: boolean;
  onChangeItem?: (_items: ISelectedItem[]) => void;
}

// our chosenItems structure which title is optional and
// is used when our list has ComplexItems
// and we don't need it when our items is SimpleItem
interface ISelectedItem {
  title?: string;
  selectedItem: string;
}

const CheckboxList = ({
  list,
  chosenItems = [],
  type = "checkbox",
  clickable = false,
  onChangeItem = (_items: ISelectedItem[]) => {},
}: ListInterface) => {
  /* //this state holds selectedItems
   const [selectedItems, setSelectedItems] =
     useState<ISelectedItem[]>(chosenItems);*/

  /* // it runs to fire onChangeItem() when our selectedItems get changed
   useEffect(() => {
     onChangeItem(selectedItems);
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedItems]);*/

  /* useEffect(()=>{setSelectedItems(chosenItems)},[chosenItems])
   */
  // it handles onChangeItem() for simpleItem forms
  const simpleListOnChange = (state: boolean, item: string) => {
    if (state) {
      onChangeItem([...chosenItems, { selectedItem: item }]);
    } else {
      onChangeItem([...chosenItems].filter((e) => e.selectedItem !== item));
    }
  };

  // it handles onChangeItem() for complexItem forms
  const complexListOnChange = (
    state: boolean,
    item: ComplexItem,
    title: string
  ) => {
    if (state) {
      onChangeItem([
        ...chosenItems,
        { title: item.title, selectedItem: title },
      ]);
    } else {
      [...chosenItems].filter((e) => e.selectedItem !== title);
    }
  };

  const RadioSection = () => {
    return (
      <div className={styles.radioList}>
        {list.map((item, index) => {
          if (typeof item === "string") {
            return (
              <div key={item} className={styles.checkbox}>
                <RadioButton
                  title={item}
                  clickable={clickable}
                  isSelected={
                    !!chosenItems.find((e) => e.selectedItem === item)
                  }
                  titleToRight
                  onChange={(state) => simpleListOnChange(state, item)}
                />
              </div>
            );
          }
          return (
            <div key={index}>
              <p className={styles.title}>{item.title}</p>
              {item.list.map((title: string) => {
                return (
                  <div className={styles.checkbox} key={title}>
                    <RadioButton
                      title={title}
                      clickable={clickable}
                      isSelected={
                        !!chosenItems.find(
                          (e) =>
                            e.selectedItem === title && item.title === e.title
                        )
                      }
                      titleToRight
                      onChange={(state) => {
                        complexListOnChange(state, item, title);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const CheckboxSection = () => {
    return (
      <div className={styles.list}>
        {list.map((item, index) => {
          if (typeof item === "string") {
            return (
              <div key={index} className={styles.checkbox}>
                <Checkbox
                  checked={!!chosenItems.find((e) => e.selectedItem === item)}
                  readonly={!clickable}
                  className={styles.checkboxSquare}
                  onChange={(state) => simpleListOnChange(state, item)}
                />
                <p>{item}</p>
              </div>
            );
          }
          return (
            <div key={index}>
              <p className={styles.title}>{item.title}</p>
              {item.list.map((title: string) => {
                return (
                  <div key={title} className={styles.checkbox}>
                    <Checkbox
                      checked={
                        !!chosenItems.find(
                          (e) =>
                            e.selectedItem === title && item.title === e.title
                        )
                      }
                      readonly={!clickable}
                      className={styles.checkboxSquare}
                      onChange={(state) => {
                        complexListOnChange(state, item, title);
                      }}
                    />
                    <p>{title}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return type === "checkbox" ? CheckboxSection() : RadioSection();
};

export default CheckboxList;
