import {
  createContext,
  ProviderProps,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from "react";
import { ILoginInfo, login } from "api/auth";
import { Redirect } from "react-router";
import { setAxiosRole, setAxiosToken } from "api";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useProfile } from "hooks/useProfile";
import { UserRoleName } from "api/types/userTypes";
import clsx from "clsx";
import classes from "../common/loader/styles.module.scss";
import { BounceLoader } from "react-spinners";

// constants keys for holding the data in local storage
const STORAGE_TOKEN_KEY = "token";
const STORAGE_ROLE_KEY = "role";

interface IRole {
  role: UserRoleName;
  roleName: string;
  facility: string;
  facilityId: number;
}

// an interface for user logged-in and it's token determination
interface IAuthData {
  isLoggedIn: boolean;
  token: string | null;
  role?: string;
  roles?: IRole[];
}

// interface for authenticate's context
interface IAuthContext extends IAuthData {
  logIn: (token: string, role: UserRoleName) => void;
  logOut: () => void;
  // changeRole: (role: UserRoleName) => boolean;
}

// get users information from local storage incase that user had logged-in before
function getDefaultData(): IAuthData {
  const browserToken = sessionStorage.getItem(STORAGE_TOKEN_KEY);
  const browserRole = sessionStorage.getItem(STORAGE_ROLE_KEY);

  if (browserToken && browserRole) {
    setAxiosToken(browserToken);
    setAxiosRole(browserRole as UserRoleName);

    return {
      isLoggedIn: true,
      token: browserToken,
      role: browserRole,
    };
  }

  return {
    isLoggedIn: false,
    token: null,
  };
}

// this function helps us to clear storage data incase that user logout from account
function clearLocalStorage() {
  // localStorage.removeItem(STORAGE_TOKEN_KEY);
  // localStorage.removeItem(STORAGE_ROLE_KEY);
  sessionStorage.removeItem(STORAGE_TOKEN_KEY);
  sessionStorage.removeItem(STORAGE_ROLE_KEY);
}

// initializing authentication context
const AuthContext = createContext<IAuthContext>({
  ...getDefaultData(),
  logIn: (_) => {},
  logOut: () => {},
  // changeRole: (_name) => false,
});

// authProvider gives us capability of use the context
export function AuthProvider({
  children,
}: Partial<ProviderProps<IAuthContext>>) {
  // holds user's authentication information
  const [value, setValue] = useState<IAuthData>({ ...getDefaultData() });
  // call api for /profile and get userInformation if user authenticated
  const profileQuery = useProfile(value.isLoggedIn);
  const role = profileQuery.data?.data.data?.role.toLowerCase();

  // this function gets token and role and save them in local storage
  // beside it sets that token to axios for further api calls
  // and in the end it sets user's authentication information inside value state
  const logIn = useCallback((token: string, role: UserRoleName) => {
    // localStorage.setItem(STORAGE_TOKEN_KEY, token);
    // localStorage.setItem(STORAGE_ROLE_KEY, role);
    sessionStorage.setItem(STORAGE_TOKEN_KEY, token);
    sessionStorage.setItem(STORAGE_ROLE_KEY, role);
    setAxiosRole(role);
    setAxiosToken(token);

    setValue({
      isLoggedIn: true,
      token: token,
      role: role,
    });
  }, []);

  // this function clears the storage and removes the token after user get logged out
  // and sets user's authentication information to null inside value state
  const logOut = useCallback(() => {
    clearLocalStorage();
    setAxiosToken(null);

    setValue({
      isLoggedIn: false,
      token: null,
      role: undefined,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...value, role, logOut, logIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// this interface used for useAuth hook
interface IUseAuth extends IAuthData {
  logIn: (data: ILoginInfo) => Promise<void>;
  logOut: (callAPI?: boolean) => Promise<void>;
  // changeRole: (role: UserRoleName, roleId: number) => void;
}

// this hook loads auth context and has methods for login and logout request
export function useAuth(): IUseAuth {
  const authContext = useContext(AuthContext);
  const queryClient = useQueryClient();

  if (!authContext) {
    throw new Error("useAuth is only usable under AuthProvider!");
  }
  // used for send login request
  const loginRequest = useMutation(login);
  // used for send logout request
  // const logoutRequest = useMutation(submitLogout);

  // trigger login api with given login data
  const logIn = async (data: ILoginInfo) => {
    const response = await loginRequest.mutateAsync(data);
    const token = response.data.data?.token;
    const role = response.data.data?.user.role;

    if (!token || !role) {
      throw new Error("Token is not provided in the response.");
    }

    authContext.logIn(token, role as UserRoleName);
  };

  // trigger logout api
  const logOut = async (callAPI = true) => {
    // if (callAPI) {
    //   await logoutRequest.mutateAsync(); // call api.
    // }

    authContext.logOut();
    queryClient.clear(); // clear local catch.
  };

  //TODO:i don't have any idea what is this for
  // const changeRole = (role: UserRoleName, roleId: number) => {
  //   setAxiosFacility(roleId);
  //   setAxiosRole(role);
  //   queryClient.clear();
  //   authContext.changeRole(role);
  // };

  return { ...authContext, logIn, logOut };
}

// this function maps server role names to UserRoleName enum
// function mapServerRoleName(name: string): UserRoleName {
//   switch (name) {
//     case "Super Admin":
//       return UserRoleName.SuperAdmin;

//     case "Doctor":
//       return UserRoleName.Doctor;

//     case "Doctor Network Admin":
//       return UserRoleName.DoctorNetworkAdmin;

//     case "Staff":
//       return UserRoleName.Staff;

//     case "Local Admin":
//       return UserRoleName.LocalAdmin;

//     case "CMO":
//       return UserRoleName.CMO;

//     case "Patient":
//       return UserRoleName.Patient;

//     default:
//       throw new Error("Can't recognize role name.");
//   }
// }

// this wrapper check if user authenticated or not
// and take actions based on authentication state
export function WithAuth({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const { isLoggedIn, role: selectedRole } = useAuth();
  const profileQuery = useProfile(isLoggedIn);
  const { location } = useHistory();

  // console.log(selectedRole, roles);

  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect to={"/login"} />;
  }

  if (profileQuery.isLoading) {
    return (
      <div
        className={clsx(
          "d-flex justify-content-center py-5 align-items-center",
          classes.loader
        )}
        style={{ height: "100vh" }}
      >
        <BounceLoader size={30} />
      </div>
    );
  }

  const pathName = location.pathname.split("/")[2];

  const haveRole = selectedRole;
  // console.log(location.search);

  // stripe and paypal redirect
  const role = selectedRole;

  /**
   * patient must fill past medical history
   */
  // console.log("hmh: ", profileQuery.data?.data.data?.has_medical_history);

  if (!haveRole) {
    return <Redirect to={`/panel/${role}/`} />;
  }

  if (!selectedRole || selectedRole !== pathName) {
    return <Redirect to={`/panel/${selectedRole}/`} />;
  }

  return <>{children}</>;
}
