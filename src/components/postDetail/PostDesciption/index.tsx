import Image from 'next/image';

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
      <p className={cx('description')}>{desc}</p>
      {discordLink && (
        <a href={`${discordLink}`} target='_blank' rel='noreferrer'>
          <button className={cx('discord-btn')}>
            <div className={cx('icon')}>
              <Image src={url} alt={alt} width={20} height={20} />
            </div>
            {discordLink}
          </button>
        </a>
      )}
    </div>
  );
};

export default PostDescription;
