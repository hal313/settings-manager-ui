// TODO: Test

let getAllElements = (target, rootElement) => {
    // TODO: Throw on types (target AND rootElement)
    return (rootElement||document.body).querySelectorAll(target) || [];
};

export {getAllElements};