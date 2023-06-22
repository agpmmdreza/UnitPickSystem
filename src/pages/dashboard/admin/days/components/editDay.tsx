import Page from "components/layout/page";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { IParam } from "interfaces/param";
import { getDayById, IDayData, updateDay } from "api/days";
import DayForm from "./dayForm";

const EditUser = () => {
  const { id } = useParams<IParam>();

  const { data } = useQuery(["dayById", id], () => getDayById(Number(id)));
  const { mutate } = useMutation((data: IDayData) =>
    updateDay(Number(id), data)
  );

  return (
    <Page title="ویرایش کاربر" type="inner" backTo="pop">
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
    </Page>
  );
};

export default EditUser;
