import { useState } from 'react';

import { CATEGORY_OPTIONS } from '../EditPage/EditPage.constants';
import useInitMap from './hooks/useInitMap';
import * as S from './MapPage.styled';

import Header from '@/components/Header';
import { CategoryType } from '@/types/filter';

const MAP_ID = 'map';

const MapPage = () => {
  useInitMap();

  const [categoryFilters, setCategoryFilters] = useState({
    READING: false,
    ENGLISH: false,
    LANGUAGE: false,
    NEWS: false,
    HOBBY: false,
    OTHERS: false,
  });

  const handleCheckFilter = (category: CategoryType) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <S.MapContainer id={MAP_ID}>
      <S.HeaderOverlay>
        <Header>
          <Header.Left>
            <Header.BackButton />
          </Header.Left>
          <Header.Right>
            <Header.MenuButton />
          </Header.Right>
        </Header>
        <S.FilterBadgeWrapper>
          {CATEGORY_OPTIONS.map((filter) => (
            <S.FilterBadge
              key={filter.value}
              value={filter.value}
              $isSelected={categoryFilters[filter.value]}
              onClick={() => handleCheckFilter(filter.value)}
              category={filter.value}
            >
              {filter.label}
            </S.FilterBadge>
          ))}
        </S.FilterBadgeWrapper>
      </S.HeaderOverlay>
    </S.MapContainer>
  );
};

export default MapPage;
