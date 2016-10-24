import ReactDOM from "react-dom";

export default function(rootView) {
  const root = document.createElement("div");
  root.id = 'root';
  document.body.appendChild(root);
  ReactDOM.render(rootView, root);
}