import React from "react";
import { render } from "react-dom";
import { SWRConfig } from "swr";

import { ErrorBoundary, http } from "utils";
import App from "./App";

import reducer from "./reducers";

/**
 * initialize reducer
 */
reducer();

render(
  <ErrorBoundary>
    <SWRConfig
      value={{
        fetcher: (url) => http.get(url).then(({ data }) => data),
        shouldRetryOnError: false,
        errorRetryInterval: 0,
        errorRetryCount: 2,
      }}
    >
      <App />
    </SWRConfig>
  </ErrorBoundary>,
  document.getElementById("root")
);
