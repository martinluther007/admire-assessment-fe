import { IoMail, IoEye } from "react-icons/io5";
import AuthContainer from "../components/AuthContainer";
import useForm from "../customs/useForm";
import axios from "axios";
import Cookies from "js-cookie";
import { displayErrorToast, displaySuccessToast } from "../helpers/toast";
import { useEffect, useState } from "react";
import { signupUrl } from "../helpers/url";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import { CTX } from "../contexts/GlobalContexts";
const Register = () => {
  const { setJwt, jwt } = CTX();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const initialState = {
    email: "",
    password: "",
    fullname: "",
  };
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { handleChange, handleBlur, errors, values } = useForm(initialState);

  useEffect(() => {
    if (!errors.email && !errors.fullname && !errors.password) {
      setDisabled(false);
    }
    if (errors.email || errors.fullname || errors.password) {
      setDisabled(true);
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const status = Object.values(values).map((el) => el.length === 0);
    if (status.includes(true)) {
      return displayErrorToast("Please fill in all your inputs");
    }
    const data = {
      name: values.fullname,
      email: values.email,
      password: values.password,
    };

    setIsLoading(true);
    axios
      .post(signupUrl, data)
      .then((data) => {
        setIsLoading(false);
        setJwt(data.data.token);
        Cookies.set("token", data.data.token);
        displaySuccessToast("Authentication successfull");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        displayErrorToast(err.response.data.message);
      });
  };

  return (
    <AuthContainer headingMain="register">
      <form className="form__container" onSubmit={handleSubmit}>
        <div>
          <div className="form__box">
            <input
              placeholder="name"
              onBlur={handleBlur}
              name="fullname"
              onChange={handleChange}
            />
          </div>
          {errors.fullname && <p className="error_text">{errors.fullname}</p>}
        </div>

        <div>
          <div className="form__box">
            <IoMail className="mail_icon" />
            <input
              placeholder="email address"
              onBlur={handleBlur}
              name="email"
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="error_text">{errors.email}</p>}
        </div>
        <div>
          <div className="form__box">
            <input
              placeholder="password"
              type="password"
              onBlur={handleBlur}
              name="password"
              onChange={handleChange}
            />
            <IoEye className="password_icon" />
          </div>
          {errors.password && <p className="error_text">{errors.password}</p>}
        </div>

        <button className="btn" disabled={disabled}>
          {isLoading ? (
            <BounceLoader size={"20px"} className="loader" />
          ) : (
            "Register"
          )}
        </button>
        <div className="routebox">
          Already have an account? please <a href="/login">login</a>
        </div>
      </form>
    </AuthContainer>
  );
};

export default Register;
