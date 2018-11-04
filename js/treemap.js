let DATA = [
    { value: 82, name: "Germany" },
    { value: 67, name: "France" },
    { value: 328, name: "U.S.A." },
    { value: 66, name: "UK" },
    { value: 46, name: "Spain" },
    { value: 146, name: "Russia" },
    { value: 1394, name: "China" },
    { value: 60, name: "Italy" },
    { value: 5, name: "Denmark" }
].sort((a,b) => a.value - b.value);

let target = {
    width: 800,
    height: 400
};

let totalValue = 0,
    currWidth  = 0,
    currHeight = 0;

DATA = DATA.map((item, index) => {
    item.width = target.width,
    item.height = target.height,
    item.position = { X: 0, Y: 0 };

    if (index % 2 === 0) {
        if (index === 0) {
            currWidth += item.width;
            currHeight += item.height;
        } else {
            item.width = currWidth;
            item.height = (item.value / totalValue) * currHeight;

            item.position.Y = currHeight;
            currHeight += item.height;
        }
    } else {
        item.height = currHeight;
        item.width = (item.value / totalValue) * currWidth;

        item.position.X = currWidth;
        currWidth += item.width;
    }
    totalValue += item.value;

    return item;
});

let scaleX = target.width / currWidth,
    scaleY = target.height / currHeight;

DATA = DATA.map(item => {
    item.width  *= scaleX;
    item.height *= scaleY;

    item.position.X *= scaleX;
    item.position.Y *= scaleY;

    return item;
})

var $treemap = document.getElementsByClassName("treemap")[0];

DATA.forEach(item => {
    let $el = document.createElement("div");
    $el.classList.add("box");

    $el.style.height = item.height + "px";
    $el.style.width = item.width + "px";

    $el.style.left = item.position.X + "px";
    $el.style.bottom = item.position.Y + "px";

    $el.style["line-height"] = item.height + "px";
    $el.innerText = item.name;

    $el.setAttribute("title", item.name);

    $treemap.appendChild($el);
});

console.log(result);
