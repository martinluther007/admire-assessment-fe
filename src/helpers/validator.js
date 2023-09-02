// eslint-disable-next-line no-useless-escape
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateFullName = (fullname, errors) => {
  if (!fullname) {
    return (errors.fullname = "Full name cannot be empty");
  } else {
    errors.fullname = "";
  }
};
const validateEmail = (email, errors) => {
  if (!email) {
    return (errors.email = "Email cannot be empty");
  } else if (!emailRegex.test(email)) {
    return (errors.email = "Please put in a valid email");
  }
  errors.email = "";
};

const validatePassword = (password, errors) => {
  if (!password) {
    return (errors.password = "Password cannot be empty");
  } else if (password.length < 8) {
    return (errors.password = "Password cannot be less than 8 characters");
  }
  errors.password = "";
};

const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "email":
      validateEmail(values.email, errors);
      break;
    case "fullname":
      validateFullName(values.fullname, errors);
      break;
    case "password":
      validatePassword(values.password, errors);
      break;
  }
  return errors;
};
export default validator;
