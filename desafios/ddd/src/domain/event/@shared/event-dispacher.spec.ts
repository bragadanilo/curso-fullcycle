import Address from "../../entity/address";
import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispacher from "./event-dispacher";

describe('Domain events tests', () => {

    it('should register an event handler', () => {

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', () => {

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispacher.unregister('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it('should unregister all event handler', () => {

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispacher.unregisterAll();

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it('should notify an event of SendEmailWhenProductIsCreatedHandler', () => {

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispacher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 10.0,
        });

        // quando o notify for executado o SendEmailWhenProductIsCreated deve ser chamado
        eventDispacher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    describe('Customer events', () => {

        it('should notify an event of EnviaConsoleLog1Handler', () => {

            const eventDispacher = new EventDispacher();
            const eventHandler = new EnviaConsoleLog1Handler();
            const spyEventHandler = jest.spyOn(eventHandler, "handle");
            const eventName = 'CustomerCreatedEvent';

            eventDispacher.register(eventName, eventHandler);

            expect(eventDispacher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

            const customerCreatedEvent = new CustomerCreatedEvent({
                id: 'customer_1',
                name: 'Customer 1',
            });

            // quando o notify for executado o EnviaConsoleLog1Handler deve ser chamado
            eventDispacher.notify(customerCreatedEvent);

            expect(spyEventHandler).toHaveBeenCalled();
        });

        it('should notify an event of EnviaConsoleLog2Handler', () => {

            const eventDispacher = new EventDispacher();
            const eventHandler = new EnviaConsoleLog2Handler();
            const spyEventHandler = jest.spyOn(eventHandler, "handle");
            const eventName = 'CustomerCreatedEvent';

            eventDispacher.register(eventName, eventHandler);

            expect(eventDispacher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

            const customerCreatedEvent = new CustomerCreatedEvent({
                id: 'customer_2',
                name: 'Customer 2',
            });

            // quando o notify for executado o EnviaConsoleLog2Handler deve ser chamado
            eventDispacher.notify(customerCreatedEvent);

            expect(spyEventHandler).toHaveBeenCalled();
        });

        it('should notify all events of CustomerCreatedEvent', () => {

            const eventDispacher = new EventDispacher();
            const eventHandler1 = new EnviaConsoleLog1Handler();
            const eventHandler2 = new EnviaConsoleLog2Handler();

            const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
            const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
            const eventName = 'CustomerCreatedEvent';

            eventDispacher.register(eventName, eventHandler1);
            eventDispacher.register(eventName, eventHandler2);

            expect(eventDispacher.getEventHandlers[eventName][0]).toMatchObject(eventHandler1);
            expect(eventDispacher.getEventHandlers[eventName][1]).toMatchObject(eventHandler2);
            expect(eventDispacher.getEventHandlers[eventName].length).toBe(2);

            const customerCreatedEvent = new CustomerCreatedEvent({
                id: 'customer_n',
                name: 'Customer n',
            });

            // quando o notify for executado o EnviaConsoleLog2Handler deve ser chamado
            eventDispacher.notify(customerCreatedEvent);

            expect(spyEventHandler1).toHaveBeenCalled();
            expect(spyEventHandler2).toHaveBeenCalled();
        });

        it("should notify when customer change the address", () => {
            const eventDispacher = new EventDispacher();
            const eventHandler = new EnviaConsoleLogHandler();
            const spyEventHandler = jest.spyOn(eventHandler, "handle");
            const eventName = "CustomerAddressChangedEvent";

            eventDispacher.register(eventName, eventHandler);

            expect(
                eventDispacher.getEventHandlers[eventName][0]
            ).toBeDefined();

            expect(
                eventDispacher.getEventHandlers[eventName][0]
            ).toMatchObject(eventHandler);

            const customerChangeAddress = new CustomerAddressChangedEvent({
                id: "customer_1",
                name: "Customer 1",
                address: new Address("street1", 100,"054560-009","São Paulo")
            });

            eventDispacher.notify(customerChangeAddress);
            expect(spyEventHandler).toHaveBeenCalled();
        });
    });
});