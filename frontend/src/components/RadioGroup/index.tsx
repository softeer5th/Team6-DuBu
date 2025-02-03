import * as S from './RadioGroup.styled';

import { Filter } from '@/types/filter';

interface RadioGroupProps {
  name: string;
  filters: Filter[];
  selectedValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({ name, filters, selectedValue, handleChange }: RadioGroupProps) => {
  return (
    <S.RadioGroupWrapper>
      {filters.map((filter) => (
        <label key={filter.value}>
          <S.HiddenInput type="radio" name={name} value={filter.value} onChange={handleChange} />
          <S.RadioBadge $isSelected={selectedValue === filter.value}>{filter.label}</S.RadioBadge>
        </label>
      ))}
    </S.RadioGroupWrapper>
  );
};

export default RadioGroup;
