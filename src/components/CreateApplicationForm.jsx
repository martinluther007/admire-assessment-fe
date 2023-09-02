/* eslint-disable react/prop-types */

import { useState } from "react";
import { BounceLoader } from "react-spinners";
import { displayErrorToast, displaySuccessToast } from "../helpers/toast";
import axios from "axios";
import { applicationUrl } from "../helpers/url";
import { CTX } from "../contexts/GlobalContexts";
const CreateApplicationForm = ({ onHandleFormState, onHandleRerun }) => {
  const { jwt } = CTX();

  const [isLoading, setIsLoading] = useState(false);
  const [universityName, setUniversityName] = useState("");
  const [universityCourse, setUniversityCourse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!universityCourse || !universityName) {
      return displayErrorToast("Please fill in all the values");
    }

    setIsLoading(true);
    axios
      .post(
        applicationUrl,
        {
          universityName,
          universityCourse,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        onHandleRerun();
        onHandleFormState();
        return displaySuccessToast("Data uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
        displayErrorToast(err.response.data.message);
        setIsLoading(false);
      });
  };
  return (
    <div className="overlay">
      <div className="overlay__box">
        <form onSubmit={handleSubmit}>
          <div className="intro-box">
            <svg
              width="16"
              height="32"
              viewBox="0 0 16 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="32" rx="4" fill="#FFC72B" />
            </svg>
            <h2> create application</h2>
          </div>

          <input
            type="text"
            placeholder="university name"
            onChange={(e) => setUniversityName(e.target.value)}
          />
          <input
            type="text"
            placeholder="university course"
            onChange={(e) => setUniversityCourse(e.target.value)}
          />
          {isLoading ? (
            <BounceLoader size={"20px"} className="loader" />
          ) : (
            <div className="btn-box">
              <button className="appbtn btn-cancel" onClick={onHandleFormState}>
                cancel
              </button>
              <button className="appbtn btn-submit">submit</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateApplicationForm;
