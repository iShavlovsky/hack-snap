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
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4135_2398)">
      <path
        d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z"
        fill="#FF523A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.9321 11.1586C13.9321 10.629 13.4447 10.2302 12.9405 10.3925C11.0899 10.9884 9.72295 12.0961 8.91593 13.3443C8.74778 13.6044 8.46734 13.7779 8.15763 13.7779H5.70108C5.14817 13.7779 4.7475 13.25 4.96086 12.7399C6.56362 8.90805 10.9123 6.16064 16.0256 6.16064C21.2008 6.16064 25.5928 8.97503 27.1474 12.8797C27.3499 13.3883 26.9496 13.9066 26.4022 13.9066H23.9745C23.6571 13.9066 23.3712 13.7245 23.2047 13.4542C22.4078 12.1614 21.0154 11.0058 19.1106 10.3925C18.6064 10.2302 18.1191 10.629 18.1191 11.1586V20.8416C18.1191 21.3712 18.6064 21.77 19.1106 21.6077C21.0154 20.9944 22.4078 19.8388 23.2047 18.5459C23.3712 18.2757 23.6571 18.0936 23.9745 18.0936H26.4022C26.9496 18.0936 27.3499 18.6118 27.1474 19.1204C25.5928 23.0251 21.2008 25.8395 16.0256 25.8395C10.7888 25.8395 6.35394 22.9577 4.84953 18.9806C4.65777 18.4736 5.05745 17.9649 5.59945 17.9649H7.99942C8.32463 17.9649 8.61597 18.1559 8.78059 18.4363C9.56532 19.7733 10.9822 20.9771 12.9407 21.6077C13.4449 21.77 13.9321 21.3712 13.9321 20.8416V11.1586Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_4135_2398">
        <rect width="32" height="32" fill={color} />
      </clipPath>
    </defs>
  </svg>
);
