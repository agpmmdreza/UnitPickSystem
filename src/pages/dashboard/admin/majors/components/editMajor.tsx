import Page from "components/layout/page";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import { IParam } from "interfaces/param";
import MajorForm from "./majorForm";
import { getMajorById, IMajorData, updateMajor } from "api/majors";
import Loader from "components/common/loader";
import { queryClient } from "App";
import { notify } from "components/core/toast";

const EditUser = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();

  const { data, isLoading } = useQuery(["getMajorById", id], () =>
    getMajorById(Number(id))
  );
  const { mutate } = useMutation(
    (data: IMajorData) => updateMajor(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["majorList"]);
        notify.success("اطلاعات رشته با موفقیت ویرایش شد");
        history.replace("../majors");
      },
    }
  );

  return (
    <Page title="ویرایش کاربر" type="inner" backTo="pop">
      <Loader isLoading={isLoading}>
        <MajorForm
          initialValues={{ majorName: data?.data.data?.majorName || "" }}
          onSumbit={(values) => {
            mutate(values);
          }}
        />
      </Loader>
    </Page>
  );
};

export default EditUser;
