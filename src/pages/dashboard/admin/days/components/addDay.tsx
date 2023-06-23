import Page from "components/layout/page";
import { useMutation, useQueryClient } from "react-query";
import { addDay } from "api/days";
import DayForm from "./dayForm";
import { notify } from "components/core/toast";
import { useHistory } from "react-router";

const AddDay = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addDay, {
    onSuccess: () => {
      queryClient.invalidateQueries(["dayList"]);
      queryClient.invalidateQueries(["dayById"]);
      notify.success("روز با موفقیت اضافه شد.");
      history.replace("../days");
    },
  });

  return (
    <Page title="افزودن روز" type="inner" backTo="pop">
      <DayForm
        onSumbit={(values) => {
          mutate(values);
        }}
      />
    </Page>
  );
};

export default AddDay;
