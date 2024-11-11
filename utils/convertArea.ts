import { convertArea } from "geolib";

/**
 * geolib does not support acres or sq miles as a measurement
 * this hook adds support for acres and sq miles
 */
const convertToAcres = (value) => {
  return value * 0.00024710538146717; // converts square meters to acres
};

const convertToSqMi = (value) => {
  // converts square meters to square miles
  return value * 0.000000386102159;
};

const handleConvertArea = (area, unit) => {
  if (unit === "a") return convertToAcres(area);
  if (unit === "sqmi") return convertToSqMi(area);
  // if not acres or sq miles, use geolib convertArea()
  return convertArea(area, unit);
};

export { handleConvertArea };
