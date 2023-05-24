import {ReactComponent as SummaryBoldSVG} from "assets/icons/bold/summary-bold.svg";

// import classes from "./styles.module.scss";

function SummaryBold(props: { [key: string]: any }) {
  return <SummaryBoldSVG data-variant="bold" {...props} />;
}

export { SummaryBold };
