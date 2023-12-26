import { FunctionComponent } from "preact";
import "./error.sass";

const Error: FunctionComponent<{ error: Error }> = ({ error }) => {
  return (
    <div className="error">
      <img src="/sad-dog.png" />

      <p>{error?.message ?? error}</p>
    </div>
  );
};

export default Error;
