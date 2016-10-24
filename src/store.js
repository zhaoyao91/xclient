import fp from "lodash/fp";

export default class Store {
  constructor(initialValues) {
    if (typeof initialValues === 'object') this._state = fp.cloneDeep(initialValues);
    else this._state = {};

    this._listenerCounter = 0;
    this._listeners = {};
  }

  set(path, value) {
    const oldState = this._state;
    const newState = fp.assoc(path, value)(oldState);
    this._state = newState;
    this._notifyAll(oldState, newState);
  }

  get(path) {
    if (!path) return this._state;
    else return fp.prop(path)(this._state);
  }

  unset(path) {
    const oldState = this._state;
    const newState = fp.dissoc(path)(oldState);
    this._state = newState;
    this._notifyAll(oldState, newState)
  }

  subscribe(callback) {
    this._listenerCounter = this._listenerCounter + 1;
    const id = this._listenerCounter;
    this._listeners[ id ] = callback;
    return id;
  }

  unsubscribe(id) {
    delete this._listeners[ id ];
  }

  _notifyAll(oldState, newState) {
    Object.keys(this._listeners).forEach(id => {
      const listener = this._listeners[ id ];
      listener && listener(newState, oldState);
    });
  }
}