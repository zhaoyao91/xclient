export default function(buildInstance) {
  let instance ;
  return function(...args) {
    if (!instance) {
      instance = buildInstance(...args);
    }
    return instance;
  }
}