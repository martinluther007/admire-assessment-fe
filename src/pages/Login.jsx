import { useEffect, useState } from "react";
import AuthContainer from "../components/AuthContainer";
import { IoMail, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CTX } from "../contexts/GlobalContexts";
import useForm from "../customs/useForm";
import { BounceLoader } from "react-spinners";
import { signinUrl } from "../helpers/url";
import axios from "axios";
import { displayErrorToast, displaySuccessToast } from "../helpers/toast";
import Cookies from "js-cookie";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const { jwt, setJwt } = CTX();
  const { handleChange, handleBlur, errors, values } = useForm(initialState);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  useEffect(() => {
    if (!errors.email && !errors.password) {
      setDisabled(false);
    }
    if (errors.email || errors.password) {
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
      .post(signinUrl, data)
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
    <AuthContainer headingMain="login">
      <form className="form__container" onSubmit={handleSubmit}>
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
            "login"
          )}
        </button>
        <div className="routebox">
          Don&rsquo;t have an account? please <a href="/signup">register</a>
        </div>
      </form>
    </AuthContainer>
  );
};

export default Login;
