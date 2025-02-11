import * as S from './RadioGroup.styled';

import { Filter } from '@/types/filter';

interface RadioGroupProps {
  name: string;
  filters: Filter[] | readonly Filter[];
  selectedValue: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RadioGroup = ({ name, filters, selectedValue, handleChange, disabled }: RadioGroupProps) => {
  return (
    <S.RadioGroupWrapper>
      {filters.map((filter) => (
        <label key={filter.value}>
          <S.HiddenInput
            type="radio"
            name={name}
            value={filter.value}
            onChange={handleChange}
            disabled={disabled}
          />
          <S.RadioBadge $isSelected={selectedValue === filter.value} $disabled={disabled}>
            {filter.label}
          </S.RadioBadge>
        </label>
      ))}
    </S.RadioGroupWrapper>
  );
};

export default RadioGroup;
