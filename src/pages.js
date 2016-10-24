import React from "react";

export default class Pages extends React.Component {
  render() {
    const { location, routes } = this.props;

    for (let id in routes) {
      const route = routes[ id ];
      const params = route.match(location.pathname);
      if (params) {
        const Page = route.options.page;
        return <Page params={params} query={location.query}/>
      }
    }

    return <div>not found</div>
  }
}