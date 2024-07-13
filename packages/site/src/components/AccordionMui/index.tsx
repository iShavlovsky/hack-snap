import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// Определение интерфейсов для пропсов
type AccordionItem = {
  id: string;
  summary: string;
  details: string;
  subSummary?: string;
  icon?: React.ReactNode;
};

type ControlledAccordionsProps = {
  items: AccordionItem[];
};

// Компонент ControlledAccordions
const ControlledAccordions: React.FC<ControlledAccordionsProps> = ({
  items,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {items.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
        >
          <AccordionSummary
            expandIcon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="currentcolor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.10225 6.35225C4.32192 6.13258 4.67808 6.13258 4.89775 6.35225L9 10.4545L13.1023 6.35225C13.3219 6.13258 13.6781 6.13258 13.8977 6.35225C14.1174 6.57192 14.1174 6.92808 13.8977 7.14775L9.39775 11.6477C9.17808 11.8674 8.82192 11.8674 8.60225 11.6477L4.10225 7.14775C3.88258 6.92808 3.88258 6.57192 4.10225 6.35225Z"
                />
              </svg>
            }
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography sx={{ width: '40%', flexShrink: 0 }}>
              {item.summary}
            </Typography>

            {item.subSummary && (
              <Typography sx={{ color: 'text.secondary', marginLeft: 'auto' }}>
                {item.subSummary}
              </Typography>
            )}
            {item.icon && (
              <span style={{ margin: '0 .5rem' }}>{item.icon}</span>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.details}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ControlledAccordions;
