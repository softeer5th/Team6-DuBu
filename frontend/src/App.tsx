import styled from 'styled-components';

import Icon from './components/Icon';

const App = () => {
  return (
    <>
      <Icon icon="AddressHome" />
      <Icon icon="AddressUniv" />
      <Icon icon="Chevron" />
      <Icon icon="CheckCircle" />
      <Icon icon="Switch" />
      <FontTest>테스트</FontTest>
    </>
  );
};

const FontTest = styled.span`
  ${({ theme }) => theme.fonts.title24};
`;

export default App;
