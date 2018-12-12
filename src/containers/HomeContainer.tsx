import * as React from "react";
import { inject, observer } from "mobx-react";
import { ApplicationStore } from "../stores/ApplicationStore";
import { Home } from "../components/Home/Home";
import { CatStore } from "../stores";

interface HomeContainerProps {
  store?: ApplicationStore;
  catStore?: CatStore;
}

@inject("store", "catStore")
@observer
export class HomeContainer extends React.Component<HomeContainerProps, {}> {
  render() {
    const { store, catStore } = this.props;
    const inc = catStore.fetchCats.bind(this, [catStore.offset + 100]);
    const dec = catStore.fetchCats.bind(this, [catStore.offset - 100]);
    return [
      <Home
        key="home"
        counter={catStore.offset}
        increment={inc}
        decrement={dec}
      />,
      <div key="state">
        {catStore.state} : {catStore.giphyCats.length}
        <br />
        {catStore.giphyCats.map(cat => {
          return (
            <img
              style={{ display: "inline-block", margin: "-2px 0px -2px 0px" }}
              key={cat.id}
              src={cat.url}
              alt={cat.title}
            />
          );
        })}
      </div>
    ];
  }
}
