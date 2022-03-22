import { Container } from 'inversify';
import {FlightSearch} from './desktop/functional/dsl/flight-search.dsl'

const myContainer = new Container();
myContainer.bind<FlightSearch>(FlightSearch.CONTAINER_ID).to(FlightSearch);

export {myContainer};