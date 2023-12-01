import { convertArea } from "geolib";
import convertToAcres from "./convertToAcres";
import convertToSqMi from "./convertToSqMiles";

// geolib does not support acres or sq miles as a measurement
// this hook adds support for acres and sq miles
export default handleConvertArea = (area, unit) => {
  if (unit === "a") return convertToAcres(area);
  if (unit === "sqmi") return convertToSqMi(area);
  // if not acres or sq miles, use geolib convertArea()
  return convertArea(area, unit);
}