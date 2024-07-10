import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import styled from 'styled-components';

type CardProps = {
  content: {
    title?: string;
  };
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

export const AnalyticsForm = ({ content }: CardProps) => {
  const { title } = content;
  return (
    <FormControl component="fieldset" sx={{ mb: CheckboxLabelMb }}>
      <Title>{title}</Title>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              sx={{ '& .MuiSvgIcon-root': { fontSize: CheckboxIcoSize } }}
            />
          }
          label="Order Book"
          labelPlacement={CheckboxLabelPosition}
          sx={{ span: { fontSize: CheckboxLabelSize } }}
        />

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              sx={{ '& .MuiSvgIcon-root': { fontSize: CheckboxIcoSize } }}
            />
          }
          label="Price Chart"
          labelPlacement={CheckboxLabelPosition}
          sx={{ span: { fontSize: CheckboxLabelSize } }}
        />

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              sx={{ '& .MuiSvgIcon-root': { fontSize: CheckboxIcoSize } }}
            />
          }
          label="Token Info"
          labelPlacement={CheckboxLabelPosition}
          sx={{ span: { fontSize: CheckboxLabelSize } }}
        />

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              sx={{ '& .MuiSvgIcon-root': { fontSize: CheckboxIcoSize } }}
            />
          }
          label="Security Check"
          labelPlacement={CheckboxLabelPosition}
          sx={{ span: { fontSize: CheckboxLabelSize } }}
        />

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              sx={{ '& .MuiSvgIcon-root': { fontSize: CheckboxIcoSize } }}
            />
          }
          label="Top Traders"
          labelPlacement={CheckboxLabelPosition}
          sx={{ span: { fontSize: CheckboxLabelSize } }}
        />
      </FormGroup>
    </FormControl>
  );
};
