import {ReactComponent as SendSvg} from "assets/icons/bold/send-icon.svg";

function SendBold(props: { [key: string]: any }) {
  return <SendSvg data-variant="bold" {...props} />;
}

export { SendBold };
