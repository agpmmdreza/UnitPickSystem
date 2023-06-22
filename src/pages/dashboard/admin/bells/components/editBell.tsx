import Page from "components/layout/page";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router";
import { IParam } from "interfaces/param";
import BellForm from "./bellForm";
import { getBellsById, IBellData, updateBell } from "api/bells";
import { notify } from "components/core/toast";

const EditUser = () => {
  const { id } = useParams<IParam>();
  const queryClient = useQueryClient();
  const history = useHistory();

  const { data } = useQuery(["bellById", id], () => getBellsById(Number(id)));
  const { mutate } = useMutation(
    (data: IBellData) => updateBell(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bellsList"]);
        queryClient.invalidateQueries(["bellById"]);
        notify.success("زنگ با موفقیت ویرایش شد.");
        history.replace("../bells");
      },
    }
  );

  return (
    <Page title="ویرایش زنگ" type="inner" backTo="pop">
      <BellForm
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
