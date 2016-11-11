import { createRouter } from '@exponent/ex-navigation';

import Events from './scenes/events/Events';
import EventContainer from './scenes/event/EventContainer';
import Organizations from './scenes/organizations/Organizations';
import Organization from './scenes/organization/Organization';
import Settings from './scenes/settings/Settings';
import Editions from './scenes/settings/Editions';
import Notifications from './scenes/settings/Notifications';

const Router = createRouter(() => ({
  events: () => Events,
  event: () => EventContainer,
  organizations: () => Organizations,
  organization: () => Organization,
  settings: () => Settings,
  editions: () => Editions,
  notifications: () => Notifications,
}));

export default Router;
