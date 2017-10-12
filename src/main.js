import di from '@csgis/di';
import bus from '@geoladris/event-bus';
import layout from 'layout';

di.bind('bus', bus);
layout();
export default 42;
