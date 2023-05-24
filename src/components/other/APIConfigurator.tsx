import {AxiosError, AxiosInstance} from "axios";
import {useAuth} from "hooks/useAuth";
import {useEffect} from "react";
import apiCaller, {IServerResponse} from "api";
import {useHistory} from "react-router-dom";
import {notify} from "components/core/toast";

interface IAPIConfiguratorProps {
  axiosInstance?: AxiosInstance;
  onError?: (message: string) => void;
}

export function APIConfigurator({
  axiosInstance = apiCaller,
  onError = (error) => notify.error(error),
}: IAPIConfiguratorProps) {
  const { logOut, role } = useAuth();
  const history = useHistory();

  const errorHandler = async (error: AxiosError<IServerResponse<null>>) => {
    if (!error.response) {
      if (error.code !== "ERR_CANCELED") {
        // "ERR_CANCELED" happened if the file query or mutation has been canceled.
        // in this case we don't want to show an error message.
        onError("Unable to get server response. Please check your connection.");
      }
      return Promise.reject(error);
    }

    switch (error.response.status) {
      case 401:
        await logOut(false);
        onError("Your session has been expired. Please login again.");
        break;

      case 403:
        onError("Access Denied");
        history.replace(`/panel/${role}/`);
        break;

      case 406:
        onError(error.response.data.message!); // back-end guarantees this behavior.
        break;

      case 422:
        const errorMsg = error.response.data.message;
        if (!!errorMsg) {
          onError(errorMsg);
        }
        break;

      default:
        onError(error.response.data.message ?? "Something went wrong");
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    axiosInstance.interceptors.response.use(undefined, errorHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
