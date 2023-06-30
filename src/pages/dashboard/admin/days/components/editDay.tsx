import Page from "components/layout/page";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import { IParam } from "interfaces/param";
import { getDayById, IDayData, updateDay } from "api/days";
import DayForm from "./dayForm";
import Loader from "components/common/loader";
import { queryClient } from "App";
import { notify } from "components/core/toast";

const EditUser = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();

  const { data, isLoading } = useQuery(["dayById", id], () =>
    getDayById(Number(id))
  );
  const { mutate } = useMutation(
    (data: IDayData) => updateDay(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["dayList"]);
        notify.success("اطلاعات با موفقیت ویرایش شد");
        history.replace("../days");
      },
    }
  );

  return (
    <Page title="ویرایش کاربر" type="inner" backTo="pop">
      <Loader isLoading={isLoading}>
        <DayForm
          initialValues={
            data?.data.data && {
              ...data?.data.data,
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
