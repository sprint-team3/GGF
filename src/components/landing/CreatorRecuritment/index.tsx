import Link from 'next/link';

import classNames from 'classnames/bind';

import styles from './CreatorRecuritment.module.scss';

const cx = classNames.bind(styles);

const CreatorRecuritment = () => {
  return (
    <div className={cx('recruitment')}>
      <div className={cx('recruitment-container')}>
        <div className={cx('recruitment-container-inner')}>
          <h2 className={cx('recruitment-heading')}>
            <span className={cx('br')}>온라인 콘텐츠</span>
            크리에이터 모집
          </h2>
          <div className={cx('recruitment-paragraph')}>
            <p>나만의 팁, 스킬을 영상으로 제작하고 업로드하세요</p>
            <p>
              누구나 <span className={cx('recruitment-creator')}>GGF 크리에이터</span>가 될 수 있습니다
            </p>
          </div>
        </div>
        <button className={cx('recruitment-button')}>
          <Link href={'mailto:ggfcreator@macr2.com'}>
            지원하기
            <div className={cx('line')}></div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CreatorRecuritment;
