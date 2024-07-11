import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import styled from 'styled-components';

import type { OptionType } from './types';

type CardProps<T> = {
  content: {
    title?: string;
  };
  selectedValues: T[];
  data: OptionType<T>[];
  onChange: (val: T) => void;
};

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;
// todo: form settings
const CheckboxIcoSize = 24;
const CheckboxLabelSize = 18;
const CheckboxLabelMb = 4;
const CheckboxLabelPosition = 'end';

export const AnalyticsForm = <T,>({
  content,
  data,
  selectedValues,
  onChange,
}: CardProps<T>) => {
  const { title } = content;
  return (
    <FormControl component="fieldset" sx={{ mb: CheckboxLabelMb }}>
      <Title>{title}</Title>
      <FormGroup>
        {data.map(({ label, value }, index) => (
          <FormControlLabel
            key={index}
            checked={selectedValues?.includes(value)}
            control={
              <Checkbox
                color="primary"
                sx={{ '& .MuiSvgIcon-root': { fontSize: CheckboxIcoSize } }}
              />
            }
            onChange={() => onChange(value)}
            label={label}
            labelPlacement={CheckboxLabelPosition}
            sx={{ span: { fontSize: CheckboxLabelSize } }}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
