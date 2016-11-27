import { expect } from 'chai';

import { findEvent } from '../EventContainer';

describe('<EventContainer />', () => {
  it('should find an event', () => {
    const eventId = 42;
    const events = {
      9: {
        items: [
          { Event: { id: 41 } },
          { Event: { id: eventId } },
          { Event: { id: 43 } },
        ],
      },
      10: {
        items: [
          { Event: { id: 44 } },
          { Event: { id: 45 } },
          { Event: { id: 46 } },
        ],
      },
    };
    const event = findEvent(eventId, events);
    expect(event.Event.id).to.equal(eventId);
  });
});
