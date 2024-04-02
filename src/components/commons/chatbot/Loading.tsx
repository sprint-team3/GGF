import classNames from 'classnames/bind';
import { PulseLoader } from 'react-spinners';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

const LOADER_COLOR = '#ADFF00';
const LOADER_SIZE = 6;
const LOADER_SPEED_MULTIPLIER = 0.7;

export const Loading = () => {
  return (
    <div className={cx('loading')}>
      <PulseLoader color={LOADER_COLOR} size={LOADER_SIZE} speedMultiplier={LOADER_SPEED_MULTIPLIER} />
    </div>
  );
};
