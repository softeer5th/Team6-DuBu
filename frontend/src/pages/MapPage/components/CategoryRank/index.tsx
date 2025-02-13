import { useState } from 'react';

import * as S from './CategoryRank.styled';
import CategoryRankItem from './CategoryRankItem';

// TODO: API 호출하여 카테고리 순위 받아오기
const CategoryRank = () => {
  const [categoryRankList, setCategoryRankList] = useState([
    { rank: 1, category: 'READING', count: 41 },
    { rank: 2, category: 'ENGLISH', count: 32 },
    { rank: 3, category: 'LANGUAGE', count: 23 },
  ] as const);

  return (
    <S.CategoryRankLayout>
      <S.CategoryRankHeader>
        <S.HeaderTitle>
          <span>내 주변 통학생들은</span>
          <span>다음 목표를 수행하고 있어요</span>
        </S.HeaderTitle>

        <S.SloganWrapper>
          <span>지도의 마커를 누르고</span>
          <span>다른 사람들의 할 일을 즐겨찾기에 추가해보세요</span>
        </S.SloganWrapper>
      </S.CategoryRankHeader>

      {/* 카테고리 순위 */}
      <S.CategoryRankList>
        {categoryRankList.map((rankItem, idx) => (
          <CategoryRankItem key={idx} rankItem={rankItem} />
        ))}
      </S.CategoryRankList>
    </S.CategoryRankLayout>
  );
};

export default CategoryRank;
