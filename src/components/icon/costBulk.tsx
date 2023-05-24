import {ReactComponent as CostSVG} from "assets/icons/bulk/cost-icon.svg";

function CostBulk(props: { [key: string]: any }) {
  return <CostSVG data-variant="bulk" {...props} />;
}

export { CostBulk };
