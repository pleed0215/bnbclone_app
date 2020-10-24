import React, { useEffect } from "react";

import Presenter from "./Presenter";

export default ({ getRooms, rooms, page }) => {
  useEffect(() => {
    getRooms();
  }, []);
  return <Presenter rooms={rooms} page={page} />;
};
