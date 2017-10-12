import di from '@csgis/di';
import bus from '@geoladris/event-bus';

di.bind('bus', bus);
export default 42;
