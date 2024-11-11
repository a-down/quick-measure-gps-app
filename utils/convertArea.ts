import { convertArea } from "geolib";

/**
 * geolib does not support acres or sq miles as a measurement
 * this hook adds support for acres and sq miles
 */
const convertToAcres = (value) => {
  const acres = value * 0.00024710538146717; // converts square meters to acres
  return convertArea(acres, "a");
};

const convertToSqMiles = (value) => {
  // converts square meters to square miles
  const sqMiles = value * 0.000000386102159;
  return convertArea(sqMiles, "sqmi");
};

export { convertToAcres, convertToSqMiles };
