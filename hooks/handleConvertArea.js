import { convertArea } from "geolib";
import convertToAcres from "./convertToAcres";
import convertToSqMi from "./convertToSqMiles";

// geolib does not support acres as a measurement
// this hook handles adds support for acres
export default handleConvertArea = (area, unit) => {
  if (unit === "a") return convertToAcres(area);
  if (unit === "sqmi") return convertToSqMi(area);
  
  return convertArea(area, unit);
}