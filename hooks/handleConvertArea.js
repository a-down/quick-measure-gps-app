import { convertArea } from "geolib";
import convertToAcres from "./convertToAcres";

// geolib does not support acres as a measurement
// this hook handles adds support for acres
export default handleConvertArea = (area, unit) => {
  if (unit === "a") {
    return convertToAcres(area);
  } else {
    return convertArea(area, unit);
  }
}