import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS, FAQ_LIST } from '@/constants';

import styles from './FAQ.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.chat;

type FAQProps = {
  onClick: (action: number) => void;
};

export const FAQ = ({ onClick }: FAQProps) => {
  return (
    <div className={cx('faq')}>
      <article className={cx('faq-menu')}>
        <h1 className={cx('faq-menu-title')}>자주 물어보는 질문이에요</h1>
        <ul className={cx('faq-question')}>
          {FAQ_LIST.map(({ id, title }) => (
            <li className={cx('faq-question-list')} key={`faq-${id}`}>
              <button className={cx('faq-question-list-item')} onClick={() => onClick(id)}>
                <Image src={url} alt={alt} width={16} height={16}></Image>
                <span className={cx('faq-question-list-item-title')}>{title}</span>
              </button>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};
