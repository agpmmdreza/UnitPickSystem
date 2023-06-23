import Page from "components/layout/page";
import ChangePasswordForm from "./components/changePasswordForm";

function ChangePassword() {
  return (
    <div>
      <Page title="تغییر رمز عبور" type="inner" backTo="pop">
        <ChangePasswordForm />
      </Page>
    </div>
  );
}

export default ChangePassword;
