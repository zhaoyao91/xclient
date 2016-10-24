import React from 'react';
import createCache from 'react-view-cache';

export default function(options) {
  const scrollHelper = {
    _records: {},
    saveScroll(id) {
      this._records[ id ] = document.body.scrollTop;
    },

    loadScroll(id) {
      document.body.scrollTop = this._records[ id ];
    },

    clearScroll(id) {
      delete this._records[ id ];
    }
  };

  const Cache = createCache(Object.assign({}, options, {
    hooks: {
      beforeSwitch(oldId, newId) {
        if (oldId) scrollHelper.saveScroll(oldId);
      },
      afterSwitch(oldId, newId) {
        if (newId) scrollHelper.loadScroll(newId);
      },
      beforeRemove(id) {
        if (id) scrollHelper.clearScroll(id);
      }
    }
  }));

  class CachedPages extends React.Component {
    render() {
      const { location, routes } = this.props;

      for (let id in routes) {
        const route = routes[ id ];
        const params = route.match(location.pathname);
        if (params) {
          const Page = route.options.page;
          const page = ({isActive}) => <Page params={params} query={location.query} isActive={isActive}/>;
          const viewId = route._path === '*' ? 'not-found' : location.pathname;
          return <Cache viewId={viewId} view={page} cacheTime={route.options.cacheTime}/>
        }
      }

      return <Cache viewId="not-found" view={<div>not found</div>}/>;
    }
  }

  return CachedPages;
}