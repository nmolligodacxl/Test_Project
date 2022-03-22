import {
    Logger,
    FlightSearchResultsPOM
} from '../../../index';
import logger from '../util/logger';

export class FlightSearchResults {

    searchResults: FlightSearchResultsPOM = new FlightSearchResultsPOM();

    waitUntilPageLoad() {
      this.searchResults.waitUntilPageLoad();
    }
    
    
    flightSearchResults(): number {
      return this.searchResults.flightResultsCount();
    }
}