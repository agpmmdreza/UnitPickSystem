import clsx from "clsx";
import {CouponIconWithDollar, CouponIconWithPercentage,} from "components/icon";
import {FC, MouseEventHandler} from "react";
import Button from "../button";
import styles from "./styles.module.scss";

type Theme = "blue" | "light";

type DiscountType = "percentage" | "amount";

interface PromotionCardProps {
  theme?: Theme;
  discountType?: DiscountType;
  leftReminding?: number;
  allReminding?: number;
  amount: number;
  timeSpan: string[];
  discountCode: string;
  onClickDetail?: MouseEventHandler;
  description: string;
}

/**
 * defaults: theme=primary-main, discountType=percentage
 * @param params
 * @returns PromoteComponent
 * /reminding: remaining discount code=10/30 all=30 left=10, empty= unlimited/
 * timeSpan: one array of two string date=['07/11/2021','08/11/2021']
 */
const PromotionCard: FC<PromotionCardProps> = ({
  theme = "blue",
  discountType = "percentage",
  leftReminding,
  allReminding,
  amount,
  timeSpan,
  discountCode,
  onClickDetail,
  description,
}) => {
  const handleCopyCodeToClipboard = (value: string) => {
    try {
      navigator?.clipboard?.writeText(value);
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return (
    <div
      className={clsx(
        styles.promotion,
        theme === "blue" ? styles.blueTheme : styles.lightTheme
      )}
    >
      <div className={styles.discount}>
        <div className={clsx(styles.icon)}>
          {" "}
          {discountType === "percentage" ? (
            <CouponIconWithPercentage className={styles.couponIcon} />
          ) : (
            <CouponIconWithDollar className={styles.couponIcon} />
          )}
        </div>
        <div>
          <h3>
            {amount}
            {discountType === "percentage" ? "%" : "$"}
          </h3>
          <p>Discount</p>
        </div>
      </div>
      <div className={styles.description}>
        <p className={styles.descriptionText}>{description}</p>
        <p className={styles.time}>
          {allReminding ? (
            <>
              <span>
                {leftReminding}/{allReminding}
              </span>{" "}
              Remaining
            </>
          ) : (
            "Unlimited"
          )}
        </p>
        <p className={styles.date}>
          {timeSpan[0]} <span>to</span> {timeSpan[1]}
        </p>
      </div>
      <div
        onClick={() => handleCopyCodeToClipboard(discountCode)}
        className={styles.discountCode}
        title="click to copy"
      >
        {discountCode}
      </div>
      <div className={styles.buttonBackground}>
        <Button
          type="button"
          variant={"outlined"}
          color="secondary"
          onClick={onClickDetail}
          className={styles.detailButton}
        >
          Edit Details
        </Button>
      </div>
    </div>
  );
};

export default PromotionCard;
