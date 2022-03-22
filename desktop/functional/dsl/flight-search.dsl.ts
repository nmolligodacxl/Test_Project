import { inject, injectable } from "inversify";
import {
    Logger,
    flightTripType,
    FlightSearchPOM,
    DateHelper
} from '../../../index';
import { FlightSearchData, FlightTravelDate, FlightTraveler, FlightInputInfo } from './model/flightSearch';
import logger from '../util/logger';

@injectable()
export class FlightSearch {
    public static CONTAINER_ID = Symbol.for("FlightSearch");
    search: FlightSearchPOM = new FlightSearchPOM();
    dateHelper: DateHelper = new DateHelper();

    waitUntilPageLoad() {
      this.search.waitUntilPageLoad();
    }
    
    clearLoginPopUp() {
      if (this.search.isLoginPopUpVisible())
        this.search.clickloginMenu();
    }
    selectTripType(tripType: flightTripType)
     {
        switch (tripType) {
          case 'ROUNDTRIP': {
            this.search.clickRoundTrip();
            break;
          }
          
        }
        Logger.debug(`${tripType} triptype selected`);
        return this;
      }

    enterDeparture(departureValue: string)   {
        this.search.enterDepartureValue(departureValue);
    }

    enterDestination(destinationValue: string)   {
      this.search.enterDestinationValue(destinationValue);
    }

    enterTravelDates(depDate:string, arrDate:string) {
      this.search.clickDate(depDate);
      this.search.clickDate(arrDate);
    }

    pickTravelers(adultCount:string) {
      this.search.clickTraveler();
      this.search.pickAdults(adultCount);
      this.search.clickApplyTraveler();
    }

    submitSearch() {
      this.search.clickSubmitSearch();
    }
    
    initiateFlightSearch(
        tripT: flightTripType,
        travelDates: FlightTravelDate,
        travelInfo: FlightInputInfo,
        traveller : FlightTraveler,
        
      ) {
        this.clearLoginPopUp();
        this.selectTripType(tripT);

        this.enterDeparture(travelInfo.flight[0].flightDeparture.location);
        this.enterDestination(travelInfo.flight[0].flightDestination.location);
        this.dateHelper.formatDate(new Date(), 'EEE MMM dd yyyy');
        this.enterTravelDates(this.dateHelper.formatDate(travelDates.departureDate, 'EEE MMM dd yyyy'),
                              this.dateHelper.formatDate(travelDates.arrivalDate, 'EEE MMM dd yyyy'));
        this.pickTravelers(traveller.adultCount.toString()) ;
        this.submitSearch();
        return; 
      }
}