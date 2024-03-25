type CalendarProps = {
  gameId: number;
};

const Calendar = ({ gameId }: CalendarProps) => {
  return <div>{gameId}</div>;
};

export default Calendar;
