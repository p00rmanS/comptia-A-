import {deepMobileCloud} from './deep-mobile-cloud.js';
import {deepNetworking} from './deep-networking.js';
import {deepHardware} from './deep-hardware.js';

export const deepLessons = [...deepMobileCloud, ...deepNetworking, ...deepHardware]
 .map(l => ({...l, question:l.checks[0][0], options:l.checks[0].slice(1,4), explanation:l.checks[0][4]}));
