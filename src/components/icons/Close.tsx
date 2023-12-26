import { FunctionComponent, JSX } from "preact";

const CloseIcon: FunctionComponent<JSX.HTMLAttributes<SVGElement>> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      x="0"
      y="0"
      viewBox="0 0 50 50"
    >
      <path d="M9.156 6.313L6.312 9.155 22.157 25 6.22 40.969 9.03 43.78 25 27.844 40.938 43.78l2.843-2.843L27.844 25 43.687 9.156l-2.843-2.844L25 22.157z"></path>
    </svg>
  );
};

export default CloseIcon;
