import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: CustomerAddressChangedEventData;

  constructor(eventData: CustomerAddressChangedEventData) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

export interface CustomerAddressChangedEventData {
  id: string;
  name: string;
  address: Address;
}
