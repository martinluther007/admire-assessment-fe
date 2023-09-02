import { useState } from "react";
import validator from "../helpers/validator";

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name: fieldName } = e.target;
    const failedFields = validator(values, fieldName);

    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(failedFields)[0],
    }));
  };

  return { handleChange, handleBlur, errors, values };
};

export default useForm;
