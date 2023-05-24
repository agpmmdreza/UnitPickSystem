import Page from "components/layout/page";
import {useAuth} from "hooks/useAuth";
import {useProfile} from "hooks/useProfile";
import {useEffect, useState} from "react";
import EditProfileForm, {IProfileManagement,} from "./components/editProfileForm";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phoneNumber: {
    code: "+1",
    number: "",
  },
  files: [],
};

const GlobalProfileManagement = () => {
  const [initialValues, setInitialValues] =
    useState<IProfileManagement>(INITIAL_VALUES);
  const { data, isSuccess } = useProfile(false);
  const auth = useAuth();

  useEffect(() => {
    const profileData = data?.data.data;
    setInitialValues({
      firstName: profileData?.first_name || "",
      lastName: profileData?.last_name || "",
      userName: profileData?.user_name || "",
      email: profileData?.email || "",
      phoneNumber: {
        code: profileData?.mobile.split("-")[0] || "",
        number: profileData?.mobile.split("-")[1] || "",
      },
      files: [],
    });
  }, [data]);

  return (
    <Page title={`Profile Management`} type="inner" backTo="pop">
      {isSuccess && <EditProfileForm initialValues={initialValues} />}
    </Page>
  );
};

export default GlobalProfileManagement;
