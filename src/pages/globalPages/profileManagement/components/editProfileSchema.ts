import * as Yup from "yup";

export const editProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  code: Yup.string().required("Username is required."),
});
