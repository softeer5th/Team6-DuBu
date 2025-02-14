import { useSearchParams } from 'react-router';

import { DATE_TYPE } from '@/constants/config';
import { addDay, getKoreanTime } from '@/pages/MainPage/MainPage.utils';

type DateType = keyof typeof DATE_TYPE;

const useQueryParamsDate = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateType = (searchParams.get('dateType') || DATE_TYPE.TODAY) as DateType;

  const isToday = dateType === DATE_TYPE.TODAY;
  const currentDay = isToday ? getKoreanTime() : addDay(getKoreanTime(), 1);

  const handlePrevDate = () => {
    setSearchParams({ dateType: DATE_TYPE.TODAY });
  };

  const handleNextDate = () => {
    setSearchParams({ dateType: DATE_TYPE.TOMORROW });
  };

  return { currentDay, isToday, dateType, handlePrevDate, handleNextDate };
};

export default useQueryParamsDate;
