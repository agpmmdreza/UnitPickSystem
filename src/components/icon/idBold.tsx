import {ReactComponent as IdBoldSVG, ReactComponent as IdIconBoldSVG,} from "assets/icons/bold/id-bold.svg";

function IdBold(props: { [key: string]: any }) {
  return <IdBoldSVG data-variant="bold" {...props} />;
}

export { IdBold };

function IdIconBold(props: { [key: string]: any }) {
  return <IdIconBoldSVG data-variant="bold" {...props} />;
}

export { IdIconBold };
