import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "../../api/axios";
import { useAuth } from "../../authProvider";
import jwtDecode from "jwt-decode"; //

const LOGIN_URL = "/auth/login";

const initialValues = {
  email: "",
  password: "",
};

const userSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const roleMapping = {
  "315875f8-3577-4d7c-9b33-8db671c64d5f": "student",
  "fc8660c4-d47a-4444-84bf-75037f0c0889": "teacher",
  "80366090-6abd-478d-ab74-fc4d0cde41e3": "admin",
};
const getRole = (value) => roleMapping[value] || null;

const Login = () => {
  const { setAuth } = useAuth();
  // if we have a min width of 600px we are triggering no mobile
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(LOGIN_URL, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response?.data);
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.data?.access_token;

      const user = jwtDecode(accessToken);

      const role = getRole(user.role);

    //   console.log(accessToken);
    //   console.log(role);
      setAuth(accessToken, role);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box m="20px">
      <Header title="Login" subtitle="Log IN "></Header>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {/* this vlalues come from formik */}
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                //   make it available in mobile and looking nice
                sx={{
                  "$ > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
