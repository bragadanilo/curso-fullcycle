import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispacher from "./event-dispacher";

describe('Domain events tests', ()=>{

    it('should register an event handler', ()=>{

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', ()=>{

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispacher.unregister('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it('should unregister all event handler', ()=>{

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispacher.unregisterAll();

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it('should unregister all event handler', ()=>{

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispacher.register('ProductCreatedEvent', eventHandler); //ProductCreatedEvent é o nome da classe, poderia ser ProductCreatedEvent.name

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


});