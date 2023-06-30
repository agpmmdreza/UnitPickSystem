import Page from "components/layout/page";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router";
import { IParam } from "interfaces/param";
import TimeTableForm from "./timeTableBellForm";
import {
  getTimeTableBellsById,
  ITimeTableBellData,
  updateTimeTableBell,
} from "api/timeTableBells";
import { notify } from "components/core/toast";
import Loader from "components/common/loader";

const EditUser = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["timeTableById", id], () =>
    getTimeTableBellsById(Number(id))
  );
  const { mutate } = useMutation(
    (data: ITimeTableBellData) => updateTimeTableBell(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["timeTableBellsList"]);
        queryClient.invalidateQueries(["timeTableById"]);
        notify.success("زنگ با موفقیت ویرایش شد.");
        history.replace("../time-table-bells");
      },
    }
  );

  return (
    <Page title="ویرایش کاربر" type="inner" backTo="pop">
      <Loader isLoading={isLoading}>
        <TimeTableForm
          initialValues={
            data?.data.data && {
              ...data?.data.data,
              dayId: { key: data.data.data.day.id.toString(), value: "" },
              bellId: { key: data.data.data.bell.id.toString(), value: "" },
              weekType: { key: data.data.data.weekType, value: "" },
            }
          }
          onSumbit={(values) => {
            mutate(values);
          }}
        />
      </Loader>
    </Page>
  );
};

export default EditUser;
