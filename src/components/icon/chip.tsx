import {ReactComponent as ChipLinearSvg} from "assets/icons/linear/chip-linear.svg";

function Chip(props: { [key: string]: any }) {
    return <ChipLinearSvg data-variant="linear" {...props} />;
}

export { Chip };
