import FormInput from "components/form/formInput";
import {UserBold} from "components/icon";
import {useFormik} from "formik";
import {getFormikFieldProps} from "utils/form";
import FormPhoneInput from "components/form/formPhoneInput";
import {IPhoneNumber} from "interfaces";
import Button from "components/core/button";
import {editProfileSchema} from "./editProfileSchema";
import countries from "constants/countries.json";

interface IEditProfileFormProps {
  initialValues: IProfileManagement;
}

export interface IProfileManagement {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: IPhoneNumber;
  files: File[];
}

const EditProfileForm = ({ initialValues }: IEditProfileFormProps) => {
  // const { mutate } = useMutation(updateProfile);
  // const { mutate: updateAvatar } = useMutation(uploadAvatar);
  // const history = useHistory();
  // const queryClient = useQueryClient();
  const formik = useFormik<IProfileManagement>({
    initialValues: initialValues,
    onSubmit: (values) => {
      const formData = new FormData();
      if (values.files.length !== 0) {
        formData.append("avatar", values.files[0], values.files[0].name);
        // updateAvatar(formData, {
        //   onSuccess: () => {
        //     toast.success("Avatar Uploaded Successfully");
        //     // mutate(
        //     //   {
        //     //     first_name: values.firstName,
        //     //     last_name: values.lastName,
        //     //     email: values.email,
        //     //     mobile: `${values.phoneNumber.code}-${values.phoneNumber.number}`,
        //     //   },
        //     //   {
        //     //     onSuccess: () => {
        //     //       toast.success("Profile Updated Successfully");
        //     //       queryClient.invalidateQueries("getProfile");
        //     //       history.goBack();
        //     //     },
        //     //   }
        //     // );
        //   },
        // });
      } else {
        // mutate(
        //   {
        //     first_name: values.firstName,
        //     last_name: values.lastName,
        //     email: values.email,
        //     mobile: `${values.phoneNumber.code}-${values.phoneNumber.number}`,
        //   },
        //   {
        //     onSuccess: () => {
        //       toast.success("Profile Updated Successfully");
        //       queryClient.invalidateQueries("getProfile");
        //       history.goBack();
        //     },
        //   }
        // );
      }
    },
    validationSchema: editProfileSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const getCountryCodes = () => {
    return countries.map((record) => ({
      code: record.dialCode,
      flag: record.flag,
    }));
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className="row">
          <div className="col-xl-3 col-lg-4  mt-3 p-0">
            <FormInput
              {...getFormikFieldProps("firstName", "First Name", formik)}
              rootProps={{
                placeholder: "First Name",
                icon: UserBold,
              }}
            />
          </div>
          <div className="col-xl-3 col-lg-4  mt-3 p-0">
            <FormInput
              {...getFormikFieldProps("lastName", "Last Name", formik)}
              rootProps={{
                placeholder: "Last Name",
                icon: UserBold,
              }}
            />
          </div>
          <div className="col-xl-3 col-lg-4  mt-3 p-0">
            <FormInput
              {...getFormikFieldProps("email", "Email", formik)}
              rootProps={{
                placeholder: "Email",
                icon: UserBold,
              }}
            />
          </div>
          <div className="col-xl-3 col-lg-4  mt-3 p-0">
            <FormInput
              {...getFormikFieldProps("userName", "Username", formik)}
              rootProps={{
                placeholder: "Username",
                icon: UserBold,
              }}
            />
          </div>
          <div className="col-xl-3 col-lg-4  mt-3 p-0">
            <FormPhoneInput
              {...getFormikFieldProps("phoneNumber", "Phone Number", formik)}
              countries={getCountryCodes()}
            />
          </div>
        </div>
        <div className="col-12 my-2 mt-5"></div>
        <div className="d-flex my-2 pt-2 justify-content-end">
          <Button
            type="reset"
            variant="outlined"
            color="secondary"
            className="m-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="m-2"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
