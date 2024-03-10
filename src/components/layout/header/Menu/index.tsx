import { useState } from 'react';

import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export const Menu = () => {
  const gameTypes = ['LEAGUE OF LEGENDS', 'BATTLEGROUNDS', 'OVERWATCH 2', 'MINCRAFT'];
  const [activatedGameType, setActivatedGameType] = useState<number>(0);

  const handleActivateGameType = (number: number) => {
    setActivatedGameType(number);
  };

  return (
    <div className={cx('container')}>
      {gameTypes.map((type, index) => (
        <button
          className={cx('button', { activated: activatedGameType === index })}
          key={index}
          onClick={() => handleActivateGameType(index)}
        >
          <p>{type}</p>
          {activatedGameType === index && <p className={cx('under-line')}></p>}
        </button>
      ))}
    </div>
  );
};
