import {PropsWithChildren} from "react";
import clsx from "clsx";
import {BounceLoader} from "react-spinners";

interface ILoaderProps extends PropsWithChildren<any> {
  isLoading: boolean;
  isError?: boolean;
}

//? Creates a 'isLoading . . .' message

const Loader = ({ isLoading, isError, children }: ILoaderProps) => {
  if (isLoading) {
    return (
      <div className={clsx("d-flex justify-content-center my-5")}>
        <BounceLoader
          size={50}
          color={"#29A9E14D"}
          loading={isLoading}
        ></BounceLoader>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="d-flex justify-content-center">Something went wrong</div>
    );
  }

  return <>{children}</>;
};

export default Loader;
