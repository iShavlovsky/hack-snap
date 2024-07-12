import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import type { OptionType } from '../types';

type CardTickersInfoProps<T> = {
  content: {
    title?: string;
  };
  disabled?: boolean;
  fullWidth?: boolean;
  data: OptionType<T>[];
};

const CardTickersInfoWraper = styled.div<{
  fullWidth?: boolean | undefined;
  disabled?: boolean | undefined;
}>`
  display: flex;
  flex-direction: column;
  min-height: 19rem;
  background-color: ${({ theme }) => theme.colors.card?.default};
  padding: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? '.4' : '1')});
  align-self: stretch;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    padding: 1.6rem;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0 0 1rem 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const Description = styled.div`
  margin-top: 1rem;
`;

export const CardTickersInfo = <T,>({
  content,
  disabled = false,
  fullWidth,
  data,
}: CardTickersInfoProps<T>) => {
  const { title } = content;
  return (
    <CardTickersInfoWraper fullWidth={fullWidth} disabled={disabled}>
      {title && <Title>{title}</Title>}
      {data.map(({ label }, index) => (
        <React.Fragment key={index}>
          <Description>
            {label}: {index}
          </Description>
          {index !== data.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      {!data.length && (
        <Description>
          Select one of the filters to display analytics
        </Description>
      )}
    </CardTickersInfoWraper>
  );
};
