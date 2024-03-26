import Image from 'next/image';

import { Fragment } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './PostDescription.module.scss';

const cx = classNames.bind(styles);

const { url, alt } = SVGS.discord;

type PostDescriptionType = {
  desc: string;
  discordLink?: string;
};

const PostDescription = ({ desc, discordLink }: PostDescriptionType) => {
  return (
    <div className={cx('post-description')}>
      <div className={cx('description')}>
        {desc.split('\n').map((comment, index) => (
          <Fragment key={`content-${index}`}>
            {comment}
            <br />
          </Fragment>
        ))}
      </div>
      {discordLink && (
        <button className={cx('discord-btn')}>
          <a className={cx('discord-btn-link')} href={`${discordLink}`} target='_blank' rel='noreferrer'>
            <div className={cx('icon')}>
              <Image src={url} alt={alt} width={20} height={20} />
            </div>
            <span className={cx('link')}>{discordLink}</span>
          </a>
        </button>
      )}
    </div>
  );
};

export default PostDescription;
