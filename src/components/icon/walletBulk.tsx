import {ReactComponent as WalletSVG} from "assets/icons/bulk/wallet-icon.svg";

function WalletBulk(props: { [key: string]: any }) {
  return <WalletSVG data-variant="bulk" {...props} />;
}

export { WalletBulk };
