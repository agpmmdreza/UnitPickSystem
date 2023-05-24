import {ReactComponent as DepartmentBoldSvg} from "assets/icons/bold/departement-bold.svg";

// department icon component
function DepartmentBold(props: { [key: string]: any }) {
    return <DepartmentBoldSvg data-variant="bold" {...props} />;
}

export { DepartmentBold };
