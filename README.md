# XClient Tools
Tools for XClient architecture.

## Categories
- [Usage](#usage)
- [Tools](#tools)
  - [bindLocation](#bindlocation)
  - [createCachedPages](#createcachedpages)
  - [composeAll](#composeall)
  - [connectStore](#connectstore)
  - [Link](#link)
  - [mountRootView](#mountrootview)
  - [Pages](#pages)
  - [Route](#route)
  - [singleton](#singleton)
  - [Store](#store)
  - [updateByProps](#updatebyprops)
  - [urlHelper](#urlhelper)

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

### bindLocation
**func(store, stateName = 'location')**

bind current location(url) of browser with a state in the store.

the structure of bound state is {**pathname**, **query**}, where pathname is the same as location.pathname and query is
an object translated from location.search.

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

### connectStore
**func(store)(mapper)(component): component**

create a container for a component which is connected to the store and will map the state of the store to the props of 
the component when the state update.

- mapper - function or object
  - function - func(newState, oldState): props
  - object - for each item, key is the prop key and value is the path of state. if value is falsy, the key is also used
  as the state path

### Link
**component**

a normal link component as `<a/>` except that if props.href is specified, clicking it will not trigger page reloading 
but only change the url.

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

### urlHelper
**object of functions**

- onUrlChange(listener)
- offUrlChange(listener)
- changeUrl(url)

## License
MIT