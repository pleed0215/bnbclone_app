import React, { useEffect } from "react";

import Presenter from "./Presenter";

export default ({ getFavs }) => {
  useEffect(() => {
    getFavs();
  }, []);
  return <Presenter />;
};
