import { createRouter } from '@exponent/ex-navigation';

import EventsContainer from './scenes/events/EventsContainer';
import EventContainer from './scenes/event/EventContainer';
import OrganizationsContainer from './scenes/organizations/OrganizationsContainer';
import OrganizationContainer from './scenes/organization/OrganizationContainer';
import Settings from './scenes/settings/Settings';
import Editions from './scenes/settings/Editions';
import Notifications from './scenes/settings/Notifications';

const Router = createRouter(() => ({
  events: () => EventsContainer,
  event: () => EventContainer,
  organizations: () => OrganizationsContainer,
  organization: () => OrganizationContainer,
  settings: () => Settings,
  editions: () => Editions,
  notifications: () => Notifications,
}));

export default Router;
