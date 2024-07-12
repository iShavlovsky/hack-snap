import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

type CardProps = {
  content: {
    title?: string;
  };
  showSecurityCheck?: boolean;
  toggleNotice?: (visible: boolean) => void;
};

const FormWrapper = styled('div')`
  background-color: ${({ theme }) => theme.colors.card?.default};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.default};
  padding: 2.4rem;
  align-self: stretch;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    padding: 1.6rem;
  }
`;

const Title = styled('h3')`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;
  margin-bottom: 0.3rem;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')`
  width: max-content;
  padding: 1.5rem;
  margin: 1rem;
  text-align: center;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.text?.default};
  border-radius: 0.5em;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  background-color: ${({ theme }) => theme.colors.card?.default};
  box-shadow: ${({ theme }) =>
    theme.shadows.default === 'dark'
      ? '0px 4px 8px rgb(0 0 0 / 0.7)'
      : '0px 4px 8px rgb(0 0 0 / 0.1)'};
  font-family: 'IBM Plex Sans', sans-serif;
  z-index: 1;
`;

const CheckboxLabel = styled('div')`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-size: 18px;

  & > span {
    & > input {
      pointer-events: none;
    }
  }
`;

const items = [
  { label: 'Order Book' },
  { label: 'Price Chart' },
  { label: 'Token Info' },
  { label: 'Top Traders' },
];

export const AnalyticsFormSimple = ({
  content,
  showSecurityCheck = true,
  toggleNotice,
}: CardProps) => {
  const { title } = content;
  const [anchorEls, setAnchorEls] = React.useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [securityCheck, setSecurityCheck] = React.useState<boolean>(false);

  const handleClick =
    (label: string) => (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEls((prev) => ({
        ...prev,
        [label]: prev[label] ? null : event.currentTarget,
      }));
    };

  const handleSecurityCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSecurityCheck(event.target.checked);
    if (toggleNotice) {
      toggleNotice(event.target.checked);
    }
  };

  return (
    <FormWrapper>
      <FormControl component="fieldset">
        <Title>{title}</Title>
        <Divider />
        <FormGroup
          sx={{
            marginTop: 1,
          }}
        >
          {items.map((item) => (
            <CheckboxLabel key={item.label} onClick={handleClick(item.label)}>
              <Checkbox
                color="primary"
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 24,
                    marginLeft: -1.4,
                  },
                }}
              />
              <span>{item.label}</span>
              <BasePopup
                id={`${item.label}-popup`}
                open={Boolean(anchorEls[item.label])}
                anchor={anchorEls[item.label] as HTMLElement}
              >
                <PopupBody>
                  Stay tuned for updates and further releases. <br />
                  <span style={{ fontWeight: 'bold' }}>{item.label}</span>{' '}
                  <span style={{ color: '#FF523A', fontWeight: 'bold' }}>
                    coming soon
                  </span>
                </PopupBody>
              </BasePopup>
            </CheckboxLabel>
          ))}
          {showSecurityCheck && (
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={securityCheck}
                  onChange={handleSecurityCheckChange}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                />
              }
              label="Security Check"
              labelPlacement="end"
            />
          )}
        </FormGroup>
      </FormControl>
    </FormWrapper>
  );
};

export default AnalyticsFormSimple;
