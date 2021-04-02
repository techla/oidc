import React from "react";

function BrowserOnly(Component) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = { hasMounted: false };
    }
    componentDidMount() {
      this.setState((_) => ({ hasMounted: true }));
    }
    render() {
      return !this.state.hasMounted ? null : <Component />;
    }
  };
}

export default BrowserOnly;
