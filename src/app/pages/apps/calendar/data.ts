import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}

const category = [
    {
        name: '--Select--',
        value: '',
        option: "selected"
    },
    {
        name: 'Danger',
        value: 'bg-danger-subtle',
        option: ""
    },
    {
        name: 'Success',
        value: 'bg-success-subtle',
        option: ""
    },
    {
        name: 'Primary',
        value: 'bg-primary-subtle',
        option: ""
    },
    {
        name: 'Info',
        value: 'bg-info-subtle',
        option: ""
    },
    {
        name: 'Dark',
        value: 'bg-dark-subtle',
        option: ""
    },
    {
        name: 'Warning',
        value: 'bg-warning-subtle',
        option: ""
    }
];
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
const calendarEvents: EventInput[] = [
    {
        id: createEventId(),
        title: 'All Day Event 1',
        date: new Date(y, m, 1),
        location: 'test',
        description: 'test',
        className: 'bg-primary-subtle'
    },
    {
        id: createEventId(),
        title: 'Visit Online Course',
        date: new Date(y, m, d - 3, 16, 0),
        location: 'test',
        description: 'test',
        className: 'bg-warning-subtle',
    },
    {
        id: createEventId(),
        title: 'World Leprosy Day',
        date: new Date(y, m, d - 3, 16, 0),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-info-subtle',
    },
    {
        id: createEventId(),
        title: 'Meeting With Designer',
        date: new Date(y, m, d, 10, 30),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-success-subtle',
    },
    {
        id: createEventId(),
        title: 'Birthday Party',
        date: new Date(y, m, d + 1, 19, 0),
        start:new Date(y, m, d + 1, 20, 30),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-success-subtle'
    },
    {
        id: createEventId(),
        title: 'Repeating Event',
        date: new Date(y, m, d + 4, 19, 0),
        start: new Date(y, m, d + 4, 20, 30),
        end: new Date(y, m, d + 9, 22, 30),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-primary-subtle',
    },
    {
        id: createEventId(),
        title: 'Weekly Strategy Planning',
        date: new Date(y, m, d + 9, 19, 0),
        start:new Date(y, m, d + 9, 20, 30),
        end: new Date(y, m, d + 10, 22, 30),
        location: 'test',
        description: 'test',
        className: 'bg-danger-subtle'
    },
    {
        id: createEventId(),
        title: 'International Mother Language Day',
        date: new Date(y, m, d + 19, 16, 0),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-info-subtle',
    },
    {
        id: createEventId(),
        title: 'World Thinking Day',
        date: new Date(y, m, d + 20, 16, 0),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-info-subtle',
    },
    {
        id: createEventId(),
        title: 'Client Meeting with Alexis',
        date: new Date(y, m, d + 22, 19, 0),
        start:new Date(y, m, d + 22, 21, 30),
        end: new Date(y, m, d + 24, 22, 30),
        location: 'test',
        description: 'test',
        className: 'bg-danger-subtle'
    },
    {
        id: createEventId(),
        title: 'Velzon Project Discussion with Team',
        date: new Date(y, m, d + 23, 16, 0),
        start:new Date(y, m, d + 23, 19, 30),
        end: new Date(y, m, d + 24, 22, 30),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-info-subtle',
    },
    {
        id: createEventId(),
        title: 'Click for Google',
        date: new Date(y, m, d + 26, 16, 0),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-dark-subtle',
    },
    {
        id: createEventId(),
        title: `International Women's Day`,
        date: new Date(y, m, d + 34, 16, 0),
        allDay: false,
        location: 'test',
        description: 'test',
        className: 'bg-info-subtle',
    },
    
];

export { category, calendarEvents };
