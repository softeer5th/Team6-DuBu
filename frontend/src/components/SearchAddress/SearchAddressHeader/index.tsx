import Header from '@/components/Header';

const SearchAddressHeader = ({ onClick }: { onClick: () => void }) => {
  return (
    <Header>
      <Header.Left>
        <Header.BackButton onClick={onClick} />
      </Header.Left>
      <Header.Center>
        <Header.Title>주소 검색하기</Header.Title>
      </Header.Center>
    </Header>
  );
};

export default SearchAddressHeader;
