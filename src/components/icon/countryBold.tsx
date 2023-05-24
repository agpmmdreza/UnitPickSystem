import {ReactComponent as CountryBoldSVG} from "assets/icons/bold/country-bold.svg";

function CountryBold(props: { [key: string]: any }) {
  return <CountryBoldSVG data-variant="bold" {...props} />;
}

export { CountryBold };
