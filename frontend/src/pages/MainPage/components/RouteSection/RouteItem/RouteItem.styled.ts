import styled from 'styled-components';

export const RouteItemLayout = styled.div<{ $isToday: boolean }>`
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray400};
  background-color: ${({ theme, $isToday }) =>
    $isToday ? theme.colors.lightWhite70 : 'transparent'};

  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.3rem 1.25rem;
  border-radius: 1.2rem;

  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
`;

export const RouteTitleWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  min-width: 5.4rem;
`;

export const Location = styled.span<{ $isToday: boolean }>`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme, $isToday }) => ($isToday ? theme.colors.green700 : theme.colors.gray500)};
`;

export const AddressTextWrapper = styled.div`
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AddressText = styled.span`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.gray400};
`;
