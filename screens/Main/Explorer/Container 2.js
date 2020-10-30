import React, { useEffect } from "react";

import Presenter from "./Presenter";

export default ({ getRooms, rooms, page, increasePage, navigation }) => {
  useEffect(() => {
    getRooms(1);
  }, []);
  useEffect(() => {
    getRooms(page);
  }, [page]);

  return <Presenter rooms={rooms} page={page} increasePage={increasePage} />;
};
