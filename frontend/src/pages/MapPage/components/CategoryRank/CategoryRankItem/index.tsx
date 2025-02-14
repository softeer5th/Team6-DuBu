import * as S from './CategoryRankItem.styled';

import { CategoryRanking } from '@/api/map';
import { CATEGORY_MAPPER } from '@/pages/EditPage/EditPage.constants';

interface CategoryRankItemProps {
  rankItem: CategoryRanking;
}

const CategoryRankItem = ({ rankItem }: CategoryRankItemProps) => {
  return (
    <S.CategoryRankItemLayout>
      <S.RankWrapper>
        <span>{rankItem.rank}</span>
        <S.CategoryBadge $category={rankItem.category}>
          {`#${CATEGORY_MAPPER[rankItem.category]}`}
        </S.CategoryBadge>
      </S.RankWrapper>
      <span>{rankItem.num}명</span>
    </S.CategoryRankItemLayout>
  );
};

export default CategoryRankItem;
