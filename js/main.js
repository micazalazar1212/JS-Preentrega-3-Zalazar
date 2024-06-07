const flowers = [];

fetch("./js/data.json")
    .then(response => response.json())
    .then(data => {
        flowers.push(...data)
        
        counters = countersFun(flowers)

        // Actualiza los contadores con los valores de cartArray
        cartArray.forEach(item => {
            counters[item.id] = item.cantidad;
        });
        });

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

let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];

let contador = 0
products.addEventListener("click", () => showCards(flowers, cartArray));

// Creamos un contador para cada flor y lo incializamos a cada uno en 0
function countersFun(flowers) {
    return flowers.reduce((acc, flower) => {
        acc[flower.id] = 0;
        return acc;
    }, {});
}

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
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
}

function showCards(flowers, cartArray) {
    contador++;
    console.log(contador)
    prinBox.innerHTML = "";
    prinBox.className = "page";
    // si es la primera vez que se ingresa a la página y hay cosas en el localStorage se pregunta si se quieren eliminar
    if (contador == 1 && cartArray.length !== 0)  {
        askClean();
    }
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

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "x"
            deleteButton.className = "dButton"

            deleteButton.addEventListener("click", () => deleteProducts(el, row))

            row.appendChild(img_row);
            row.appendChild(p_row);
            row.appendChild(deleteButton);

            listU.appendChild(row);
        });
        prinBox.appendChild(listU);
    }
}

function deleteProducts(el, row) {
    cartArray = cartArray.filter(item => item.id !== el.id);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
    counters[el.id] = 0;
    row.remove();
    showCart(cartArray);
}

function showCart(cartArray) {
    prinBox.innerHTML = "";
    prinBox.className = "page change";    
    createCart(cartArray);
}

// Aca se pregunta, si ya hay cosas en el localStorage, si desea quitarlas o continuar donde dejó
function askClean() {
    Swal.fire({
        title: "¿Deseas continuar con tu compra de la última vez?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            Toastify({
                text: "Carrito restaurado",
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: '#355C7D',  
                    background: '-webkit-linear-gradient(to right, #C06C84, #6C5B7B, #355C7D)',
                    background: 'linear-gradient(to right, #C06C84, #6C5B7B, #355C7D)', 

                }
            }).showToast();
        } else {
            Toastify({
                text: "¡Carrito vacío!",
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: '#355C7D',  
                    background: '-webkit-linear-gradient(to right, #C06C84, #6C5B7B, #355C7D)',
                    background: 'linear-gradient(to right, #C06C84, #6C5B7B, #355C7D)', 
    
                }
            }).showToast();

            cartArray = [];
            localStorage.clear();
            flowers.forEach((el) => {
                counters[el.id] = 0
                const contDOM = document.getElementById("counter_" + el.id);
                contDOM.value = counters[el.id];
            });
            
        }
    });
}