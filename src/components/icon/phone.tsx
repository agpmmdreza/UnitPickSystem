import {ReactComponent as PhoneBoldSvg} from "assets/icons/bold/phone-bold.svg";

// phone icon component
function PhoneBold(props: { [key: string]: any }) {
    return <PhoneBoldSvg data-variant="bold" {...props} />;
}

export { PhoneBold };