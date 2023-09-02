import { useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import CreateApplicationForm from "../components/CreateApplicationForm";
import useFetch from "../customs/useFetch";
import { applicationUrl } from "../helpers/url";
import { CTX } from "../contexts/GlobalContexts";
import axios from "axios";
import { displayErrorToast, displaySuccessToast } from "../helpers/toast";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [reRun, setReRun] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const { jwt, logout } = CTX();

  const navigate = useNavigate();
  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [jwt, navigate]);

  const { datum } = useFetch(applicationUrl, jwt, reRun);
  const handleFormIsShownState = () => {
    setFormIsShown(!formIsShown);
  };
  const handleRerunState = () => {
    setReRun(!reRun);
  };

  const handleDeleteApplication = (id) => {
    console.log(id);
    setDeleteIsLoading(true);
    axios
      .delete(`${applicationUrl}/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((data) => {
        console.log(data);
        setDeleteIsLoading(false);
        handleRerunState();
        return displaySuccessToast("Data deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        displayErrorToast(err.response.data.message);
        setDeleteIsLoading(false);
      });
  };

  return (
    <>
      {formIsShown && (
        <CreateApplicationForm
          onHandleFormState={handleFormIsShownState}
          onHandleRerun={handleRerunState}
        />
      )}
      <main className="table__container">
        <div className="intro__box" draggable="true">
          <button
            style={{ marginRight: "10px" }}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
          <button onClick={handleFormIsShownState}>create application</button>
        </div>
        {datum ? (
          <div className="table__main">
            <div className="table__head">
              <div className="table__head--1">student Name</div>
              <div className="table__head--1">university name</div>
              <div className="table__head--1">university Course</div>

              <div className="table__head--1">delete</div>
            </div>

            {datum &&
              datum.data.data.application.map((el) => (
                <div key={el._id} className="table__body ">
                  <div className="table__head--1">{el.studentName}</div>
                  <div className="table__head--1">{el.universityName}</div>
                  <div className="table__head--1">{el.universityCourse}</div>
                  <div
                    className="table__head--1"
                    onClick={() => handleDeleteApplication(el._id)}
                  >
                    {deleteIsLoading ? (
                      <BounceLoader size={"20px"} className="loader" />
                    ) : (
                      <IoTrashBin className="app-deletebtn" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
};

export default Home;
