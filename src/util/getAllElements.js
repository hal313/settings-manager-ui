let getAllElements = (target, rootElement) => {
    return (rootElement||document.body).querySelectorAll(target) || [];
};

export {getAllElements};