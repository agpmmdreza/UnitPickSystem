import * as Yup from "yup";

export const editProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  userName: Yup.string().required("Username is required."),
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Email is required."),
  phoneNumber: Yup.object().shape({
    code: Yup.string().required(),
    number: Yup.string().required("Phone number is required."),
  }),
});
