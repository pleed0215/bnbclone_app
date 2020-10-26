import React, { useEffect } from "react";

import Presenter from "./Presenter";

export default ({ getFavs, favs }) => {
  useEffect(() => {
    getFavs();
  }, []);
  
  return <Presenter favs={favs} />;
};
