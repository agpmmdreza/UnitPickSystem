import { PropsWithChildren } from "react";
import { generateUUIDv4 } from "utils/uuid";
import BackGroup from "./components/backGroup";
import MainGroup from "./components/mainGroup";
import classes from "./styles.module.scss";
import EditGroup from "./components/editGroup";

interface IPageDefaultProps extends PropsWithChildren<any> {
  title: string; // in some page we have to show and underlying the user's name (e.g. reset password), so in that case you write $name instead of the username and pass the username in 'username' property. for example: title:"Reset $name Password" and pass the value 'Ali' in username prop, the result will be: "Reset <u>Ali's</u> Password"
  icon?: any;
  iconProps?: { [key: string | number | symbol]: any };
  name?: string;
}

interface IPageMainProps {
  type: "main";
}

interface IPageInnerProps {
  type: "inner";
  backTo: "pop" | string;
}
interface IPageEditInnerProps {
  type: "edit-inner";
  backTo: "pop" | string;
  editPath: string;
}

type TPageProps = IPageDefaultProps &
  (IPageMainProps | IPageInnerProps | IPageEditInnerProps);

/**
 * A function to replace a text with a JSXElement
 * @param separator A string that identifies character or characters to use in separating the string.
 * @param replaceJSXElement A JSXElement to replace
 * @param text A string to perform a replacement on
 * @returns
 */
const replaceJSX = (
  separator: string,
  ReplaceJSXElement: JSX.Element,
  text: string
) => {
  return text
    .split(separator)
    .flatMap((item) => [item, ReplaceJSXElement])
    .slice(0, -1);
};

function Page({
  title,
  icon: Icon,
  iconProps,
  type,
  backTo,
  children,
  editPath,
  name,
}: TPageProps) {
  // get the title for show in the header
  function getTitle() {
    if (name) {
      return replaceJSX(
        "$name",
        <u key={generateUUIDv4()} className={classes.username}>{`${name} `}</u>,
        title
      );
    }
    return title.replace("$name", "unknown");
  }

  return (
    <>
      <div className={classes.header}>
        <div className={classes.titleContainer}>
          <p className={classes.title}>
            <span>{getTitle()} </span>
          </p>
        </div>
        <div className={classes.iconsGroupContainer}>
          {type === "main" ? (
            <MainGroup />
          ) : (
            <>
              {type === "edit-inner" && <EditGroup editPath={editPath} />}
              <BackGroup backTo={backTo} />
            </>
          )}
        </div>
      </div>

      <div className={classes.pageContentContainer}>{children}</div>
    </>
  );
}

export default Page;
