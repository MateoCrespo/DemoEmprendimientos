export function parseDateInput(value: string) {
  const [dayText, monthText, yearText] = value.split('/');
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);

  if (!day || !month || !year || yearText?.length !== 4) {
    return undefined;
  }

  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isRealDate ? date : undefined;
}

export function isBeforeToday(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateToCompare = new Date(date);
  dateToCompare.setHours(0, 0, 0, 0);

  return dateToCompare < today;
}

export function parseTimeInput(value: string) {
  const [hourText, minuteText] = value.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (hourText?.length !== 2 || minuteText?.length !== 2) {
    return undefined;
  }

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return undefined;
  }

  return hour * 60 + minute;
}

export function validateDateAndTime(date: string, timeFrom: string, timeTo: string) {
  if (date) {
    const parsedDate = parseDateInput(date);

    if (!parsedDate) {
      return 'Ingresá una fecha válida con formato dd/mm/aaaa.';
    }

    if (isBeforeToday(parsedDate)) {
      return 'La fecha no puede ser anterior a hoy.';
    }
  }

  if (!timeFrom && !timeTo) {
    return undefined;
  }

  const parsedTimeFrom = parseTimeInput(timeFrom);
  const parsedTimeTo = parseTimeInput(timeTo);

  if (parsedTimeFrom === undefined || parsedTimeTo === undefined) {
    return 'Ingresá un rango horario válido con formato hh:mm.';
  }

  if (parsedTimeFrom >= parsedTimeTo) {
    return 'La hora desde tiene que ser más temprano que la hora hasta.';
  }

  return undefined;
}

export function validateCompletedDateAndTime(date: string, timeFrom: string, timeTo: string) {
  return getCompletedDateError(date) ?? getCompletedTimeRangeError(timeFrom, timeTo);
}

export function getCompletedDateError(date: string) {
  const dateIsComplete = date.replace(/\D/g, '').length === 8;

  if (!dateIsComplete) {
    return undefined;
  }

  const parsedDate = parseDateInput(date);

  if (!parsedDate) {
    return 'Ingresá una fecha válida con formato dd/mm/aaaa.';
  }

  if (isBeforeToday(parsedDate)) {
    return 'La fecha no puede ser anterior a hoy.';
  }

  return undefined;
}

export function getCompletedTimeRangeError(timeFrom: string, timeTo: string) {
  const timeFromIsComplete = timeFrom.replace(/\D/g, '').length === 4;
  const timeToIsComplete = timeTo.replace(/\D/g, '').length === 4;

  if (!timeFrom && !timeTo) {
    return undefined;
  }

  if (!timeFromIsComplete || !timeToIsComplete) {
    return undefined;
  }

  const parsedTimeFrom = parseTimeInput(timeFrom);
  const parsedTimeTo = parseTimeInput(timeTo);

  if (parsedTimeFrom === undefined || parsedTimeTo === undefined) {
    return 'Ingresá un rango horario válido con formato hh:mm.';
  }

  if (parsedTimeFrom >= parsedTimeTo) {
    return 'La hora desde tiene que ser más temprano que la hora hasta.';
  }

  return undefined;
}
