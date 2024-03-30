export const convertTimeStringToNumber = (time: string) => {
  if (time) {
    const splitedTime = time.split(':');
    return Number(splitedTime[0]);
  }
};

export const createTimeRange = (startHour: number, endHour: number) => {
  const timeRange = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    timeRange.push({ title: `${formattedHour}:00`, value: `${formattedHour}:00` });
  }
  return timeRange;
};

export const createHeadcountOptions = (startNumber: number, endNumber: number) => {
  const timeRange = [];
  for (let headcount = startNumber; headcount <= endNumber; headcount++) {
    timeRange.push({ title: `${headcount}`, value: `${headcount}` });
  }
  return timeRange;
};

export const normalizeEndTimes = (
  scheduleArray: { id?: number; date: string; startTime: string; endTime: string }[],
) => {
  return scheduleArray.map((schedule) => {
    const endTime = schedule.endTime === '24:00' ? '00:00' : schedule.endTime;

    return { ...schedule, endTime };
  });
};
