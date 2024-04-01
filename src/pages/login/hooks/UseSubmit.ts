import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import { login as loginRequest } from "../../../api/login";

export const useSubmit = async <T extends { [key: string]: string }>(
  values: T,
  { setSubmitting }
) => {
  const navigate = useNavigate();

  setSubmitting(true);

  const cookies = new Cookies();

  const result = await loginRequest(values.email, values.password);

  cookies.set("accessToken", result.accessToken);

  setSubmitting(false);

  navigate("/admin");
};
