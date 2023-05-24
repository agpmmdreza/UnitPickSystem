import {PropsWithChildren} from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";
import Loader from "components/common/loader";

interface IStatisticsCardProps extends PropsWithChildren<any> {
  image: any;
  entityTitle: string;
  count?: number | string;
  isLoading: boolean;
  isError: boolean;
}

// component for showing detailed statistical info about page subject
const StatisticsCard = ({
  image,
  entityTitle,
  count,
  children,
  isLoading,
  isError,
}: IStatisticsCardProps) => {
  // render component
  return (
    <Loader {...{ isLoading, isError }}>
      <div className={classes.headingBox}>
        <div className={clsx([classes.infoImage, "d-none d-md-block "])}>
          <img src={image} alt="statistics" />
        </div>

        <div
          className={clsx([classes.infoDetail, "col-12 col-md-6 ms-0 ms-md-4"])}
        >
          <div className={classes.headingTitleBox}>
            <span>
              <span className="heading-title">{entityTitle} </span>
              {count !== undefined ? (
                <>
                  <span className="heading-title">:</span>
                  <span className="heading-title-value">
                    {!!count && <span>+</span>}
                    <span>{count}</span>
                  </span>
                </>
              ) : null}
            </span>
          </div>

          {children}
        </div>
      </div>
    </Loader>
  );
};

export default StatisticsCard;
