import Page from "components/layout/page";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router";
import { IParam } from "interfaces/param";
import { notify } from "components/core/toast";
import UnitPickTimeForm from "./unitPickTimeForm";
import {
  getUnitPickTimeById,
  IUPickData,
  updateUnitPickTime,
} from "api/unitPickTime";

const EditPickTime = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data } = useQuery(["picktimeById", id], () =>
    getUnitPickTimeById(Number(id))
  );
  const { mutate } = useMutation(
    (data: IUPickData) => updateUnitPickTime(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["timeTableBellsList"]);
        queryClient.invalidateQueries(["picktimeById"]);
        notify.success("زنگ با موفقیت ویرایش شد.");
        history.replace("../time-table-bells");
      },
    }
  );

  return (
    <Page title="ویرایش زمان انتخاب واحد" type="inner" backTo="pop">
      <UnitPickTimeForm
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

export default EditPickTime;
