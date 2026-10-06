import * as core1 from './data.js';
import * as core2 from './core2-data.js';

export function courseFor(search='') {
 const second=new URLSearchParams(search).get('core')==='2';
 return {...(second?core2:core1),number:second?2:1,name:second?'Core 2':'Core 1',exam:second?'220-1202':'220-1201',storageKey:second?'core-two-mentor-v1':'core-one-mentor-v1'};
}
