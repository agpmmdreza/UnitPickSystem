import { getAnnouncementById, updateAnnouncement } from "api/announcements";
import { IAnnouncementData } from "api/timeTable";
import { notify } from "components/core/toast";
import Page from "components/layout/page";
import { IParam } from "interfaces/param";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router";
import AnnouncementsForm from "./announcementsForm";

const EditUser = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data } = useQuery(["announcementById", id], () =>
    getAnnouncementById(Number(id))
  );

  const { mutate } = useMutation(
    (data: IAnnouncementData) => updateAnnouncement(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["announcementsList"]);
        queryClient.invalidateQueries(["announcementById"]);
        notify.success("زنگ با موفقیت ویرایش شد.");
        history.replace("../announcements");
      },
    }
  );

  return (
    <Page title="ویرایش اطلاعیه" type="inner" backTo="pop">
      <AnnouncementsForm
        initialValues={
          data?.data?.data && {
            message: data.data.data.message,
            timeTableId: {
              key: data.data.data.timeTable.id.toString(),
              value: data.data.data.timeTable.course.title,
            },
          }
        }
        onSumbit={(values) => {
          mutate(values);
        }}
      />
    </Page>
  );
};

export default EditUser;
