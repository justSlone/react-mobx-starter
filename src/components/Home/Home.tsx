import * as React from "react";
import { getClassNames } from "./Home.classNames";

interface HomeProps {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

export class Home extends React.Component<HomeProps, {}> {
  render() {
    const { counter, increment, decrement } = this.props;
    const { container, button, numberDisplay } = getClassNames();

    return (
      <div className={container}>
        <button className={button} onClick={decrement}>
          -
        </button>
        <div className={numberDisplay}>{counter}</div>
        <button className={button} onClick={increment}>
          +
        </button>
      </div>
    );
  }
}
