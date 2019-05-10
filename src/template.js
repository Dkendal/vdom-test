export function h(name, attrs, ...children) {
    return {
        name,
        attrs,
        children,
    };
}
export function render(node, container) {
    container.appendChild(createElem(node));
}
export function createElem({ name, attrs, children }) {
    const el = document.createElement(name);
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
                el.appendChild(document.createTextNode(child));
                return;
            }
            el.appendChild(createElem(child));
            return;
        });
    }
    return el;
}
export function template() {
    function handleClick(e) {
        alert(e);
    }
    return (h("div", null,
        h("div", { onMouseOver: (e) => console.log('hover', e) }, "sup"),
        h("div", null,
            h("button", { onClick: handleClick }, "button"))));
}
