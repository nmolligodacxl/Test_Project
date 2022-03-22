import {
 FlightDate, FlightLocation, FlightSearchData, FlightTotalTravelers, FlightTravelDate, FlightTraveler, FlightDeparture, FlightDestination, FlightInputInfo, flightPreferredClass,  
 DateHelper
} from '../../../index';

const dateHelper = new DateHelper();
//Search Data
const flightTravelDate: FlightTravelDate = {
  departureDate: dateHelper.parseDate(
    dateHelper.addDays(10, new Date()).toString()
  ),
  arrivalDate: dateHelper.parseDate(
    dateHelper.addDays(14, new Date()).toString()
  ),
};
//Traveler
const searchTwoAdults: FlightTraveler = { adultCount:2, childrenCount:0, infantInLap:0, infantInSeat:0 };

//Location
const flightSearchRoundTrip: FlightInputInfo =   {flight:[{flightDeparture: { location:"LAS", index:0}, flightDestination:{ location:"LAX", index:0}}]};

export {
    flightTravelDate,
    searchTwoAdults,
    flightSearchRoundTrip
}
