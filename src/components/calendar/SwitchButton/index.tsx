import classNames from 'classnames/bind';

import styles from './SwitchButton.module.scss';

const cx = classNames.bind(styles);

type SwitchButtonProps = {
  isCalendar: boolean;
  onClick: (isCalendar: boolean) => void;
};

const SwitchButton = ({ isCalendar, onClick }: SwitchButtonProps) => {
  const handleMonthClick = () => onClick(true);
  const handleListClick = () => onClick(false);

  return (
    <div className={cx('switch-area')}>
      <button className={cx('switch-btn-month', { activated: isCalendar })} onClick={handleMonthClick}>
        <span>Month</span>
      </button>
      <button className={cx('switch-btn-list', { activated: !isCalendar })} onClick={handleListClick}>
        <span>list</span>
      </button>
    </div>
  );
};

export default SwitchButton;
