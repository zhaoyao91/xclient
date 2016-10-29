# XClient Tools
Tools for [XClient architecture](https://github.com/xclient/docs).

## Categories
- [Usage](#usage)
- [Tools](#tools)
  - [createCachedPages](#createcachedpages)
  - [composeAll](#composeall)
  - [connectLocation](#connectLocation)
  - [connectStore](#connectstore)
  - [Link](#link)
  - [locationState](#locationstate)
  - [mountRootView](#mountrootview)
  - [Pages](#pages)
  - [Route](#route)
  - [Router](#router)
  - [singleton](#singleton)
  - [Store](#store)
  - [updateByProps](#updatebyprops)

## Usage

### Installation
```
npm i --save xclient
npm i --save react react-dom
```

### Import Tools
```
import {xxx} from 'xclient'
```

## Tools

### createCachedPages
**func(options): component**

create a react class **CachedPages**, which will render and cache pages by location and routes.

- options
  - cacheTime - milliseconds, default to 5 * 60 * 1000
  - cacheLimit - default to 5
- props of CachedPages
  - location - location state described in [bindLocation](#bindlocation)
  - routes - a collection of routes as an object, where key is route id and value is [route](#route). the route.options are:
    - page - page component
    - [cacheTime] - cacheTime for this route

### composeAll
**func(...composers)(component): component**
 
compose component with all composers.

- composer - func(component): component

### connectLocation
**func([mapper])(component): component

create a container for a component to provide it with location state.

- mapper - function, string or object
  - function - func(location): props
  - not provided - the whole state is mapped to props.location
  - string - the whole state is mapped to props.key, where key is this value
  - object - for each item, key is the prop key and value is the path of state. if value is falsy, the key is also used
  as the state path

### connectStore
**func(store)([mapper])(component): component**

create a container for a component which is connected to the store and will map the state of the store to the props of 
the component when the state update.

- mapper - function, string or object
  - function - func(newState, oldState): props
  - not provided - the whole state is mapped to props.state
  - string - the whole state is mapped to props.key, where key is this value
  - object - for each item, key is the prop key and value is the path of state. if value is falsy, the key is also used
  as the state path

### Link
**component**

a normal link component as `<a/>` except that if props.href is specified, clicking it will not trigger page reloading 
but only change the url.

### locationState
**singleton**

a singleton representing the browser location and providing apis to get, manipulate and listen to changes of the location.

- methods
  - getPath(): string - return the pathname with query string
  - getPathname(): string - return the pathname
  - getQuery(): object - return the query object
  - setPath(path)
  - setPathname(pathname)
  - setQuery(query)
  - subscribe(callback): id - callback is func({path, pathname, query})
  - unsubscribe(id) - id is the id returned from subscribe
  
### mountRootView
**func(component)**

mount root view component into body.

### Pages
**component**

render pages by location and routes.

- props
  - location - location state described in [bindLocation](#bindlocation)
  - routes - a collection of routes as an object, where key is route id and value is [route](#route). the route.options are:
    - page - page component
    
### Route
**class**

A route is defined by a path pattern.

- methods
  - constructor(pathPattern, options)
    - pathPattern - a pattern to define the route, it can be:
      - a normal path, such as **/some/page**
      - a path with param placeholders, such as **/users/:userId**
      - `*` which will match any path
    - options - any options which can be found as route.options
  - match(path): params - try to match a path and get the params, return {} if match without any params, return false if 
  not match
  - path(params, query): path - format a path
  - go(params, query) - format a path and change the url to it
  
### Router
**class**

A router is a collection of routes and provide a set of methods for convenience

- methods
  - constructor([routes]) - init the router with optional routes
  - route(id, path, options) - define a route
  - setRoute(id, route)
  - setRoutes(id, routes)
  - match(path): {id, params, route} - try to match a path. return undefined if no matched route
  - path(id, params, query) - build path
  - go(id, params, query) - build path and go to it
  - current() - try to match by current pathname
  
### singleton
**func(builder): getter**

build a singleton module. the builder should define how to build and return the module, the getter will always return
the same one built from builder. the args of builder and getter are same.

### Store
**class**

a reactive state store.

- methods
  - constructor(initialState) - initialState must be an object if provided
  - set(path, value)
  - get(path, value)
  - unset(path)
  - subscribe(callback): id - callback is func(newState, oldState);
  - unsubscribe(id) - id is the id returned by subscribe
  
### updateByProps
**func([...props], [deep])(component): component**

create a container for a component which will only update if props change.

- props - strings, specify which props should be compared. if not provided, all props will be compared.
- deep - a boolean flag which indicate if the props should be compared deeply.

## License
MIT