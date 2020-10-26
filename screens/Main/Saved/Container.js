import React, { useEffect } from "react";

import Presenter from "./Presenter";

export default ({ getFavs, favs }) => {
  useEffect(() => {
    getFavs();
  }, []);
  console.log(favs);
  return <Presenter favs={favs} />;
};
