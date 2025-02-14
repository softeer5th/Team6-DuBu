import { useReducer, useState } from 'react';

import DateHeader from './components/DateHeader';
import RouteSection from './components/RouteSection';
import StartButton from './components/StartButton';
import TodoListContainer from './components/TodoListContainer';
import * as S from './MainPage.styled';

import Header from '@/components/Header';
import SearchAddress from '@/components/SearchAddress';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useRedirectByMemberStatus from '@/hooks/useRedirectByMemberStatus';

const MainPage = () => {
  useRedirectByMemberStatus();
  const { isToday } = useQueryParamsDate();
  const [isSwitchAddress, toggle] = useReducer((prev) => !prev, false);

  const [startAddress, setStartAddress] = useState({
    startName: '',
    startX: 0,
    startY: 0,
  });
  const [endAddress, setEndAddress] = useState({
    endName: '',
    endX: 0,
    endY: 0,
  });

  const [isSearchAddressOpen, toggleAddressSearch] = useReducer((prev) => !prev, false);
  const [selectedAddressType, setSelectedAddressType] = useState<'home' | 'school'>('home');

  const updateAddress = ({
    title,
    coordinateX,
    coordinateY,
  }: {
    title: string;
    coordinateX: number;
    coordinateY: number;
  }) => {
    if (selectedAddressType === 'home') {
      setStartAddress((prev) => ({
        ...prev,
        startName: title,
        startX: coordinateX,
        startY: coordinateY,
      }));
    } else {
      setEndAddress((prev) => ({
        ...prev,
        endName: title,
        endX: coordinateX,
        endY: coordinateY,
      }));
    }
  };

  const handleClickSearchAddress = (type: 'home' | 'school') => {
    toggleAddressSearch();
    setSelectedAddressType(type);
  };

  if (isSearchAddressOpen) {
    return (
      <SearchAddress onClose={toggleAddressSearch} onSelectAddressMain={updateAddress} isMain />
    );
  }

  return (
    <S.MainPageLayout>
      <Header>
        <Header.Right>
          <Header.MenuButton />
        </Header.Right>
      </Header>
      <S.MainContentContainer>
        <S.HeaderContainer>
          <DateHeader />
          <RouteSection
            isSwitchAddress={isSwitchAddress}
            toggle={toggle}
            handleClickSearchAddress={handleClickSearchAddress}
            startAddress={startAddress}
            endAddress={endAddress}
          />
        </S.HeaderContainer>

        <TodoListContainer />

        {isToday && (
          <S.StartButtonWrapper>
            <StartButton
              isSwitched={isSwitchAddress}
              startAddress={startAddress}
              endAddress={endAddress}
            />
          </S.StartButtonWrapper>
        )}
      </S.MainContentContainer>
    </S.MainPageLayout>
  );
};

export default MainPage;
