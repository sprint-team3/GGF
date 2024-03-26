/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';

import { useEffect } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './MapPreview.module.scss';

const cx = classNames.bind(styles);

const { url, alt } = SVGS.map.active;

const IMAGE_SRC =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/2-3_116_1711437142067.png';

declare global {
  interface Window {
    kakao: any;
  }
}

type MapPreviewProps = {
  address: string;
};

const MapPreview = ({ address }: MapPreviewProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { kakao } = window;
      const onLoadKakaoMap = () => {
        kakao.maps.load(() => {
          const geocoder = new kakao.maps.services.Geocoder();
          const size = new kakao.maps.Size(42, 68);
          const markerImage = new kakao.maps.MarkerImage(IMAGE_SRC, size, { alt: 'GGF 마커' });
          const zoomControl = new kakao.maps.ZoomControl();

          const createMap = (coords: any) => {
            const container = document.getElementById('map');
            const options = {
              center: coords,
              level: 3,
              maxLevel: 6,
            };
            return new kakao.maps.Map(container, options);
          };

          const createMarker = (map: any, coords: any) => {
            new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage,
            });
          };

          geocoder.addressSearch(address, (result: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              const map = createMap(coords);
              map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
              map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
              createMarker(map, coords);
            } else {
              const defaultCoords = new kakao.maps.LatLng(33.450701, 126.570667);
              const map = createMap(defaultCoords);
              map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
              map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
              createMarker(map, defaultCoords);
            }
          });
        });
      };
      onLoadKakaoMap();
    }
  }, [address]);
  return (
    <div className={cx('map-preview')}>
      <div className={cx('address-group')}>
        <Image src={url} alt={alt} width={16} height={16} />
        <span className={cx('address')}>{address}</span>
      </div>
      <div className={cx('map')} id='map' />
    </div>
  );
};

export default MapPreview;
