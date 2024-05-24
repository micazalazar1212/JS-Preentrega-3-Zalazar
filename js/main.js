const box = document.getElementById("conteiner");
box.className = "box";

const title = document.createElement("h1");
title.innerText = "Bienvenido a nuestra tienda de flores y ramos Lunaria";
title.className = "title";

const products = document.createElement("button");
products.id = "products";
products.innerText = "Productos";
products.className = "products";

const cart = document.createElement("button");
cart.id = "cart";
cart.innerText = "Carrito";
cart.className = "products cart";

box.appendChild(title);
box.appendChild(products);
box.appendChild(cart);

const prinBox = document.getElementById("page");
prinBox.className = "page";

products.addEventListener("click", () => showCards(flowers));

let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];

let counters = flowers.reduce((acc, flower) => {
    acc[flower.id] = 0;
    return acc;
}, {});

// Actualizar los contadores con los valores de cartArray
cartArray.forEach(item => {
    counters[item.id] = item.cantidad;
});

function createCards(flowers) {
    flowers.forEach((el) => {
        const card = document.createElement("div");
        card.className = "cardStyle";

        const img = document.createElement("img");
        img.src = el.img;
        img.className = "imgCards";

        const item = document.createElement("div");

        const button1 = document.createElement("button");
        button1.innerText = "+";
        button1.id = "but1";

        const button2 = document.createElement("button");
        button2.innerText = "-";
        button2.id = "but2";

        const cont = document.createElement("input");
        cont.value = counters[el.id];
        cont.id = "counter_" + el.id;
        cont.readOnly = true;
        cont.className = "counter";

        button1.addEventListener("click", () => modifyProducts("+", el.id));
        button2.addEventListener("click", () => modifyProducts("-", el.id));

        item.appendChild(button1);
        item.appendChild(cont);
        item.appendChild(button2);

        card.appendChild(img);
        card.appendChild(item);

        prinBox.appendChild(card);
    });
}

function modifyProducts(op, prodID) {
    if (op === "+") {
        counters[prodID] += 1;
    } else if (op === "-" && counters[prodID] > 0) {
        counters[prodID] -= 1;
    }
    updateCartArray(prodID);
    const contadorEnDOM = document.getElementById("counter_" + prodID);
    contadorEnDOM.value = counters[prodID];
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
    console.log(JSON.stringify(cartArray));
}

function updateCartArray(prodID) {
    const existingProduct = cartArray.find(item => item.id === prodID);
    if (existingProduct) {
        if (counters[prodID] > 0) {
            existingProduct.cantidad = counters[prodID];
        } else {
            cartArray = cartArray.filter(item => item.id !== prodID);
        }
    } else if (counters[prodID] > 0) {
        const product = flowers.find(el => el.id === prodID);
        cartArray.push({ ...product, cantidad: counters[prodID] });
    }
}

function showCards(flowers) {
    prinBox.innerHTML = "";
    createCards(flowers);
}

cart.addEventListener("click", () => showCart(cartArray));

function createCart(cartArray) {
    const listU = document.createElement("ul");
    listU.id = "list";
    listU.innerHTML = "";

    if (cartArray.length === 0) {
        const anyProducts = document.createElement("p");
        anyProducts.innerText = "No hay productos en tu carrito";
        prinBox.appendChild(anyProducts);
    } else {
        const text = document.createElement("h1");
        text.innerText = "Tus productos seleccionados: ";
        text.className = "textCart";
        listU.appendChild(text);
        cartArray.forEach((el) => {
            const row = document.createElement("li");
            row.className = "row";

            const img_row = document.createElement("img");
            img_row.src = el.img;
            img_row.className = "imgRow";

            const p_row = document.createElement("p");
            p_row.innerText = `${el.name} - Cantidad: ${el.cantidad}`;
            p_row.className = "pRow";

            row.appendChild(img_row);
            row.appendChild(p_row);

            listU.appendChild(row);
        });
        prinBox.appendChild(listU);
    }
}

function showCart(cartArray) {
    prinBox.innerHTML = "";  // Limpiar el contenido de prinBox antes de renderizar
    createCart(cartArray);
}