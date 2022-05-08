let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
console.log(urlParams);

for (let item of urlParams) {
    console.log('item: ', item)
    document.cookie = `${item[0]}=${item[1]};path=/`
    localStorage.setItem(item[0], item[1]);
}

window.location.replace("./../index.html");