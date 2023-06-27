import { addAnnouncements } from "api/announcements";
import { notify } from "components/core/toast";
import Page from "components/layout/page";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import AnnouncementsForm from "./announcementsForm";

const AddTimeTableBell = () => {
  const history = useHistory();

  const { mutate } = useMutation(addAnnouncements, {
    onSuccess: () => {
      notify.success("اطلاعیه با موفقیت ثبت شد");
      history.replace("../announcements");
    },
  });

  return (
    <Page title="افزودن اطلاعیه" type="inner" backTo="pop">
      <AnnouncementsForm
        onSumbit={(values) => {
          mutate(values);
        }}
      />
    </Page>
  );
};

export default AddTimeTableBell;
