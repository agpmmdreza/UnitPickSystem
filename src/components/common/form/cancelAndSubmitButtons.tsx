import clsx from "clsx";
import Button from "components/core/button";
import {IParam} from "interfaces/param";
import {useHistory, useLocation, useParams} from "react-router";
import {isViewProfile} from "utils/route";
import {BeatLoader} from "react-spinners";
import {useState} from "react";
import Alert from "../alert";
import {useUnblock} from "../../../hooks/useBlock";

export interface ICancelAndSubmitButtonsProps {
  submitButtonTitle?: string;
  makeCenter?: boolean;
  isLoading?: boolean;
  className?: string;
  forcingTitle?: boolean;
  cancelLabel?: string;
  submitHandler?: () => void;
}

//? Returns two grouped buttons for canceling and submitting which the cancellation is outlined and submission is contained

export function CancelAndSubmitButtons({
  submitButtonTitle = "Register",
  isLoading,
  makeCenter,
  className,
  forcingTitle = false,
  cancelLabel,
  submitHandler,
}: ICancelAndSubmitButtonsProps) {
  const history = useHistory();
  const { id } = useParams<IParam>();
  const { pathname } = useLocation();
  const isViewingProfile = isViewProfile(pathname);

  const [cancelOpen, setCancelOpen] = useState(false);
  const unblock = useUnblock();

  return (
    <div
      className={clsx([
        "d-flex pt-5",
        !!makeCenter ? "justify-content-center" : "justify-content-end",
        className,
      ])}
      style={{ marginTop: "50px" }}
    >
      <Button
        variant="outlined"
        color="secondary"
        className="mx-3"
        onClick={() => {
          if (isViewingProfile) {
            unblock();
            history.goBack();
          } else {
            setCancelOpen(true);
          }
        }}
        disabled={!!isLoading}
      >
        {isViewingProfile ? "Close" : cancelLabel || "Cancel"}
      </Button>
      {!isViewingProfile && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mx-3"
          disabled={!!isLoading}
          onClick={() => {
            if (submitHandler) {
              submitHandler();
            }
          }}
          rootAttributes={
            {
              // style: { cursor: !!isLoading ? "wait" : "pointer" },
            }
          }
        >
          {isLoading ? (
            <div className="d-flex mt-2">
              <BeatLoader color="#fff" size={10} margin={2} />
            </div>
          ) : !!id && !forcingTitle ? (
            "Save changes"
          ) : (
            submitButtonTitle
          )}
        </Button>
      )}
      <Alert
        dismissible={true}
        open={cancelOpen}
        setOpen={setCancelOpen}
        title={"Cancel"}
        text={"Are you sure you want to cancel?"}
        onApprove={() => {
          history.goBack();
        }}
      />
    </div>
  );
}
