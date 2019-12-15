import React from "react";

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div class="lds-dual-ring"></div>;
  }
}

export default Loading;
