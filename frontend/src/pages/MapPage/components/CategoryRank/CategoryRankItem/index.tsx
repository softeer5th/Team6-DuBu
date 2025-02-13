import * as S from './CategoryRankItem.styled';

import { CATEGORY_MAPPER } from '@/pages/EditPage/EditPage.constants';
import { CategoryType } from '@/types/filter';

const CategoryRankItem = ({
  rankItem,
}: {
  rankItem: { rank: number; category: CategoryType; count: number };
}) => {
  return (
    <S.CategoryRankItemLayout>
      <S.RankWrapper>
        <span>{rankItem.rank}</span>
        <S.CategoryBadge category={rankItem.category}>
          {`#${CATEGORY_MAPPER[rankItem.category]}`}
        </S.CategoryBadge>
      </S.RankWrapper>
      <span>{rankItem.count}명</span>
    </S.CategoryRankItemLayout>
  );
};

export default CategoryRankItem;
