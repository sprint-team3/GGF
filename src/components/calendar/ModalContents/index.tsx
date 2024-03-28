import classNames from 'classnames/bind';

import styles from './ModalContents.module.scss';

const cx = classNames.bind(styles);

type ModalContentsProps = {
  gameId: number;
  activeDate: string;
};

const ModalContents = ({ gameId, activeDate }: ModalContentsProps) => {
  return (
    <div className={cx('')}>
      {gameId} / {activeDate}
    </div>
  );
};

export default ModalContents;
