import moment from 'moment';
import html2canvas from 'html2canvas';

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
    total: schedule.total,
    early: schedule.early,
    late: schedule.late,
    breaks: schedule.breaks,
    reserved: schedule.reserved
  }));
}

export function parseCourseToState(courses) {
  return courses.map(course => ({ ...course, penalize: true, include: true }));
}

const weekdays = ['M', 'Tue', 'W', 'Thu', 'F'];

function parseDaysToArray(days) {
  const arr = [];
  let i = 0;
  while (i < 5) {
    if (days.indexOf(weekdays[i]) >= 0) {
      arr.push(i + 1);
    }
    i += 1;
  }
  return arr;
}

function parseTimeToObj(time) {
  const split = time.indexOf('-');
  let start = time2minutes(time.slice(0, split));
  let end = time2minutes(time.slice(split + 1, -2));
  if (time.slice(-2) === 'pm' && end < 720) {
    start += 720;
    end += 720;
  }
  if (start > end) {
    start -= 720;
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(start) || isNaN(end)) {
    return null;
  }
  return { start, end };
}

function time2minutes(time) {
  const split = time.indexOf(':');
  return parseInt(time.slice(0, split), 10) * 60 + parseInt(time.slice(split + 1), 10);
}

export function parseStatesToGenSchedule(courses, preferences) {
  const result = [];
  const grands = courses.filter(node => node.type === 'adult');
  grands.forEach(grand => {
    const resultType = [];
    const typeNodes = courses.filter(node => node.parentId === grand.id);
    typeNodes.forEach(type => {
      const resultCourse = courses
        .filter(node => node.parentId === type.id && node.include)
        .map(node => ({
          name: grand.id,
          ID: node.id,
          type: node.class_type,
          instructor: node.instructor,
          location: node.location,
          days: parseDaysToArray(node.days),
          time: parseTimeToObj(node.time),
          include: node.include,
          penalize: node.penalize
        }));
      if (resultCourse.length > 0) {
        resultType.push({ name: type.id, elements: resultCourse });
      }
    });
    if (resultType.length > 0) {
      result.push({ name: grand.id, elements: resultType });
    }
  });
  return { courses: result, preferences };
}

export function parseStateToHistory(schedules) {
  return schedules.map(schedule => ({
    id: schedule.id,
    scheduleName: schedule.scheduleName
  }));
}

export function parseStateToCommunity(schedules) {
  return schedules.map(schedule => ({
    id: schedule.id,
    scheduleName: schedule.scheduleName,
    username: schedule.username
  }));
}

export function handleCalendarExport() {
  html2canvas(document.querySelector('#cal')).then(function(canvas) {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'myfile.png';
    a.click();
  });
}
