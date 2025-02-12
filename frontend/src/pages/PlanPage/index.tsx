import { useNavigate } from 'react-router';

import PlanHeader from './components/PlanHeader';
import PlanInfoHeader from './components/PlanInfoHeader';
import TimeBlockContent from './components/TimeBlockContent';
import TimeBlockHeader from './components/TimeBlockHeader';
import usePlanInfoQuery from './hooks/usePlanInfoQuery';
import useUpdateMemberStatusMutation from './hooks/useUpdateMemberStatusMutation';
import * as S from './PlanPage.styled';

import { USER_STATUS } from '@/constants/config';

const PlanPage = () => {
  const { data } = usePlanInfoQuery();
  const { mutate: updateMemberStatus } = useUpdateMemberStatusMutation();
  const navigate = useNavigate();

  const handleClickFinish = () => {
    updateMemberStatus(USER_STATUS.feedback, {
      onSuccess: () => {
        navigate('/feedback');
      },
    });
  };

  return (
    <S.PlanPageLayout>
      <PlanHeader />

      {/* 이동 정보 */}
      <PlanInfoHeader createdAt={data?.createdAt} totalSectionTime={data?.totalSectionTime} />

      <S.HorizontalLine />

      {/* 경로별 할 일 정보 */}
      <S.PlanContent>
        {data?.paths.map((path) => (
          <S.TimeBlockSection key={path.pathId}>
            <TimeBlockHeader trafficType={path.trafficType} subwayCode={path.subwayCode} />
            <TimeBlockContent
              pathId={path.pathId}
              sectionTime={path.sectionTime}
              todos={path.todos}
              trafficType={path.trafficType}
            />
          </S.TimeBlockSection>
        ))}
      </S.PlanContent>

      {/* 이동 완료 버튼 영역 */}
      <S.FinishButtonWrapper>
        <S.FinishButton onClick={handleClickFinish}>이동 완료</S.FinishButton>
      </S.FinishButtonWrapper>
    </S.PlanPageLayout>
  );
};

export default PlanPage;
