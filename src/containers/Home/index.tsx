import React, { Component } from "react";
import Style from "./style";

export default // @connect(
//   mapStateToProps,
//   mapDispatchToProps
// )
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: { index_top: [], index_middle: [] },
      banner: []
    };
  }

  render() {
    return (
      <div className={Style.home} data-spm="spm-a-home">
        首页
      </div>
    );
  }
}
