import Page from "components/layout/page";
import { useMutation } from "react-query";
import { addDay } from "api/days";
import DayForm from "./dayForm";

const AddDay = () => {
  const { mutate } = useMutation(addDay);

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
