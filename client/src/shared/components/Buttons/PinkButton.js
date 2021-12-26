import React from "react";
import Loader from "react-loader-spinner";
import "./PinkButton.scss";

const PinkButton = ({ title, onClick, loading = false }) => {
  return (
    <>
      {loading && (
        <div className="loading-container">
          <Loader
            type="Bars"
            color="#f80759"
            height={100}
            width={50}
            timeout={3000} //3 secs
          />
        </div>
      )}
      {!loading && (
        <button type="button" onClick={onClick} className="btn-submit">
          {title}
        </button>
      )}
    </>
  );
};

export default PinkButton;
