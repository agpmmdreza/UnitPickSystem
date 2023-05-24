import clsx from "clsx";
import {CancelBold, RefreshLinear} from "components/icon";
import classes from "./styles.module.scss";

function getStatusMessage(
  isError: boolean | undefined,
  finished: boolean | undefined
) {
  if (!!isError) {
    return <span className={classes.errorText}>ERROR</span>;
  }
  if (!!finished) {
    return "UPLOADED SUCCESSFULLY";
  }
  return "UPLOADING...";
}
function getUploadedPercent(progressEvent?: ProgressEvent) {
  if (progressEvent) {
    return parseFloat(
      ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2)
    );
  }
  return 0;
}
export interface IProgressbarProps {
  progressEvent?: ProgressEvent;
  isError: boolean;
  isLoading: boolean;
  cancel?: () => void;
  refresh?: () => void;
}

const Progressbar = ({
  isError,
  isLoading,
  progressEvent,
  refresh,
  cancel,
}: IProgressbarProps) => {
  if (!progressEvent && !isLoading) {
    return null;
  }
  const uploadedPercent = getUploadedPercent(progressEvent);
  const finished = progressEvent && !isLoading;
  const status = getStatusMessage(isError, finished);
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.barWrapper}>
          <div
            className={classes.bar}
            style={{ width: `${uploadedPercent}%` }}
          ></div>
        </div>
        <div className={clsx(["d-flex mt-1 mx-1", classes.text])}>
          <div>{status}</div>
          <div className="ms-auto">{`${uploadedPercent}%`}</div>
        </div>
      </div>
      <div className={classes.iconContainer}>
        {isError && refresh && (
          <div className={classes.refreshIcon} onClick={refresh}>
            <RefreshLinear />
          </div>
        )}
        {!finished && cancel && (
          <div className={classes.cancelIcon} onClick={cancel}>
            <CancelBold />
          </div>
        )}
      </div>
    </div>
  );
};

export default Progressbar;
