import { createContext, useState } from "react";
import loading from "../../assets/img/loading.gif";
import "./Loading.scss";

const DEFAULT_STATE = {
  isLoading: false,
};

export const LoadingContext = createContext(DEFAULT_STATE);

export const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);
  document.querySelector("body").style.overflow = state.isLoading
    ? "hidden"
    : "unset";
  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div className="wrapper-loading">
          <img src={loading} className="w-10" alt="" />
        </div>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};
