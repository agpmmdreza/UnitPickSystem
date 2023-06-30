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
import Loader from "components/common/loader";
import moment from "moment";

const EditPickTime = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["picktimeById", id], () =>
    getUnitPickTimeById(Number(id))
  );
  const { mutate } = useMutation(
    (data: IUPickData) => updateUnitPickTime(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getPickTimes"]);
        queryClient.invalidateQueries(["picktimeById"]);
        notify.success("زمان انتخاب واحد با موفقیت ویرایش شد.");
        history.replace("../unit-pick-time");
      },
    }
  );

  return (
    <Page title="ویرایش زمان انتخاب واحد" type="inner" backTo="pop">
      <Loader isLoading={isLoading}>
        <UnitPickTimeForm
          initialValues={
            data?.data.data && {
              entranceYear: {
                key: data.data.data.entranceYear.toString(),
                value: data.data.data.entranceYear.toString(),
              },
              pickTime: moment(data.data.data.pickTime).toDate(),
              modifyTime: moment(data.data.data.modifyTime).toDate(),
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

export default EditPickTime;
