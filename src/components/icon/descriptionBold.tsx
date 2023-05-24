import {ReactComponent as DescriptionBoldSvg} from "assets/icons/bold/description-bold.svg";

// description icon component
function DescriptionBold(props: { [key: string]: any }) {
    return <DescriptionBoldSvg data-variant="bold" {...props} />;
}

export { DescriptionBold };
