import moment from 'moment';

export function parseStateToTime(mins) {
  return moment('1880-10-06 00:00').add(mins, 'm');
}

export function parseTimeToState(day) {
  return day.diff(moment('1880-10-06 00:00'), 'm');
}

export function parseStateToCalEvents(sections) {
  const events = [];
  sections.forEach(section => {
    section.days.forEach(day => {
      events.push({
        title: section.name,
        type: section.type,
        ID: section.ID,
        instructor: section.instructor,
        location: section.location,
        start: new Date(
          moment('1880-10-03 00:00')
            .add(section.time.start, 'm')
            .add(day, 'd')
        ),
        end: new Date(
          moment('1880-10-03 00:00')
            .add(section.time.end, 'm')
            .add(day, 'd')
        )
      });
    });
  });
  return events;
}

export function parseStateToScores(schedules) {
  return schedules.map(schedule => ({
    id: schedule.id,
    total: schedule.score.total,
    early: schedule.score.early,
    late: schedule.score.late,
    interval: schedule.score.interval,
    breaks: schedule.score.breaks
  }));
}
