// pages/api/claps.js
import createClapsAPI from "@upstash/claps/api";

const ClapsAPI = createClapsAPI({
  //maxClaps: 5,
});
export default ClapsAPI;