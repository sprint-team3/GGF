import Image from 'next/image';

import { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getActivities } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { GAME_NAME_KR_TO_PATH_NAME, WEBPS } from '@/constants';
import { splitTitleByDelimiter } from '@/utils';

import SliderButton from '@/components/commons/buttons/SliderButton';
import ClanCard from '@/components/landing/ClanRecruitment/ClanCard';

import { LinkName } from '@/types';

import styles from './ClanRecruitment.module.scss';

const cx = classNames.bind(styles);

const POST_CATEGORY_CLAN = 2;
const MAX_DISPLAYED_CLAN_CARDS = 3;
const SCROLL_SLIDER_WIDTH = 1224;

const { slider } = WEBPS.landing;

const ClanRecruitment = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { data: lol } = useQuery({ queryKey: [QUERY_KEYS.activities.getList, '스포츠'], queryFn: getActivities });
  const { data: battlegrounds } = useQuery({
    queryKey: [QUERY_KEYS.activities.getList, '투어'],
    queryFn: getActivities,
  });
  const { data: overwatch } = useQuery({ queryKey: [QUERY_KEYS.activities.getList, '관광'], queryFn: getActivities });
  const { data: minecraft } = useQuery({ queryKey: [QUERY_KEYS.activities.getList, '웰빙'], queryFn: getActivities });

  const gamePostList = [lol, battlegrounds, overwatch, minecraft];

  const filteredGameCategory = gamePostList.map((gamePosts) => {
    if (!gamePosts) return [];
    return gamePosts.activities?.filter((postType) => postType.price === POST_CATEGORY_CLAN);
  });

  const filterSliderClanList = [];

  for (let i = 0; i < MAX_DISPLAYED_CLAN_CARDS; i++) {
    for (const list of filteredGameCategory) {
      if (list && list.length > i) {
        filterSliderClanList.push(list[i]);
      }
    }
  }

  const postClanCount = filterSliderClanList.length;
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const isNextSliderAvailable = currentSliderIndex + MAX_DISPLAYED_CLAN_CARDS <= postClanCount - 1;
  const isPrevSliderAvailable = currentSliderIndex >= MAX_DISPLAYED_CLAN_CARDS;

  const handleNextClick = () => {
    if (sliderRef.current && isNextSliderAvailable) {
      sliderRef.current.scrollLeft += SCROLL_SLIDER_WIDTH;
      setCurrentSliderIndex((prev) => prev + MAX_DISPLAYED_CLAN_CARDS);
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current && isPrevSliderAvailable) {
      sliderRef.current.scrollLeft -= SCROLL_SLIDER_WIDTH;
      setCurrentSliderIndex((prev) => prev - MAX_DISPLAYED_CLAN_CARDS);
    }
  };

  return (
    <section className={cx('clan')}>
      <h1 className={cx('visually-hidden')}>클랜 모집</h1>
      <div className={cx('container')}>
        <header className={cx('clan-header')}>
          <h2 className={cx('clan-header-title')}>Clan Recruitment</h2>
          <p className={cx('clan-header-description')}>
            실시간으로 모집하는 <span className={cx('clan-header-description-highlight')}>온라인 클랜</span>에 참여하여
            <br />
            <span className={cx('clan-header-description-highlight')}>다양한 동료들과 함께 팀</span>을 이뤄 미션을
            격파하세요
          </p>
        </header>

        <div className={cx('clan-slider')}>
          {isPrevSliderAvailable && (
            <div className={cx('clan-slider-btn-prev')}>
              <SliderButton type='left' onClick={handlePrevClick} />
            </div>
          )}

          <div className={cx('slider-banner')} ref={sliderRef}>
            <ul className={cx('slider-banner-list')}>
              {filterSliderClanList?.map(({ id, title, createdAt }) => {
                const { category, title: clanTitle } = splitTitleByDelimiter(title);
                const gameName = GAME_NAME_KR_TO_PATH_NAME[category] as LinkName;
                const { url, alt } = slider[gameName];

                return (
                  <li key={`slider-${id}`} className={cx('slider-banner-item', `${gameName}`)}>
                    <Image src={url} alt={alt} fill sizes='100%' className={cx('slider-banner-item-image')} />
                    <ClanCard id={id} gameName={gameName} clanTitle={clanTitle} createdAt={createdAt} />
                  </li>
                );
              })}
            </ul>
          </div>

          {isNextSliderAvailable && (
            <div className={cx('clan-slider-btn-next')}>
              <SliderButton type='right' onClick={handleNextClick} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClanRecruitment;
