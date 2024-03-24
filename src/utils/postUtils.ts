export const convertTimeStringToNumber = (time: string) => {
  if (time) {
    const splitedTime = time.split(':');
    const convertedTime = Number(splitedTime[0]);
    return convertedTime;
  }
};
