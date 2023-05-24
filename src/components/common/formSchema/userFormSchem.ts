import * as Yup from "yup";

//? Yup is a validation library and with defining schema we can tell It how to validate certain fields and it's not just for empty forms
export const staffRegisterSchema = (id: boolean) => ({
  firstname: Yup.string().required("this field is required"),
  lastname: Yup.string().required("this field is required"),
  username: Yup.string().required("this field is required"),
  ...(!id && {
    password: Yup.string()
      .min(6, "should have at least 6 characters")
      .required("this field is required"),
  }),
  employeeNumber: Yup.string().required("this field is required"),
  address: Yup.string().required("this field is required"),
  email: Yup.string()
    .email("email format is invalid")
    .required("this field is required"),
});
