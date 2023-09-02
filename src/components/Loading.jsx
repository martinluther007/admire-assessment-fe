import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading_box">
      <p>Loading</p> <BounceLoader color="#04457b" />
    </div>
  );
};

export default Loading;
