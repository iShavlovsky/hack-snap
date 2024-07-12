export const SnapLogo = ({
  color,
  size,
}: {
  color?: string | undefined;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 37 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.2543 8.1272C15.2543 7.266 14.4617 6.61753 13.6419 6.88148C10.6326 7.85042 8.40976 9.65169 7.09746 11.6814C6.82402 12.1043 6.368 12.3865 5.86438 12.3865H1.86975C0.970652 12.3865 0.319128 11.5281 0.666066 10.6987C3.27233 4.4676 10.3438 0 18.6586 0C27.074 0 34.216 4.57651 36.7438 10.9259C37.0731 11.753 36.4223 12.5957 35.5321 12.5957H31.5845C31.0683 12.5957 30.6034 12.2996 30.3326 11.8602C29.0368 9.75784 26.7725 7.87873 23.6751 6.88143C22.8553 6.61749 22.0628 7.266 22.0628 8.1272V23.8728C22.0628 24.734 22.8553 25.3825 23.6751 25.1186C26.7725 24.1213 29.0368 22.2422 30.3326 20.1398C30.6034 19.7004 31.0683 19.4043 31.5845 19.4043H35.5321C36.4223 19.4043 37.0731 20.247 36.7438 21.0741C34.216 27.4235 27.074 32 18.6586 32C10.1429 32 2.93136 27.3139 0.485028 20.8467C0.173203 20.0223 0.823129 19.195 1.70449 19.195H5.60711C6.13593 19.195 6.60968 19.5056 6.87737 19.9616C8.15343 22.1356 10.4575 24.0933 13.6422 25.1186C14.462 25.3826 15.2543 24.734 15.2543 23.8728V8.1272Z"
      fill={color}
    />
  </svg>
);
