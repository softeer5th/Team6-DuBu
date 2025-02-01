import { useSearchParams } from 'react-router';

import { addDay, getKoreanTime } from '@/pages/MainPage/MainPage.utils';

const DATE_TYPE = {
  today: 'today',
  tomorrow: 'tomorrow',
};

const useQueryParamsDate = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateType = searchParams.get('dateType') || DATE_TYPE.today;

  const isToday = dateType === DATE_TYPE.today;
  const currentDay = isToday ? getKoreanTime() : addDay(getKoreanTime(), 1);

  const handlePrevDate = () => {
    setSearchParams({ dateType: DATE_TYPE.today });
  };

  const handleNextDate = () => {
    setSearchParams({ dateType: DATE_TYPE.tomorrow });
  };

  return { currentDay, isToday, handlePrevDate, handleNextDate };
};

export default useQueryParamsDate;
