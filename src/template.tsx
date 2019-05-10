
interface Node {
    name: string,
    attrs: {} | null,
    children: Node[] | null,
}
export function h(name: string, attrs: {}, ...children: any[]) {
  return {
    name,
    attrs,
    children,
  }
}

export function render(node: Node, container: any) {
  container.appendChild(createElem(node));
}

export function createElem({name, attrs, children}: Node) {
  const el = document.createElement(name)
  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      const value = attrs[key];
      if (typeof value === "string") {
        return el.setAttribute(key, value);
      }
      if (key.startsWith('on') && typeof value === "function") {
        el.addEventListener(key.split('on')[1].toLowerCase(), value);
        return;
      }
    });
  }
  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        el.appendChild(document.createTextNode(child))
        return;
      }
      el.appendChild(createElem(child));
      return;
    })
  }
  return el;
}

export function template() {
  function handleClick(e: any) {
    alert(e)
  }

  return (
    <div>
      <div onMouseOver={(e) => console.log('hover', e)}>sup</div>
      <div>
        <button onClick={handleClick}>button</button>
      </div>
    </div>
  );
}
