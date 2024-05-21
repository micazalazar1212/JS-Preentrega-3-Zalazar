const box = document.getElementById("conteiner");
box.className = "box";

const products = document.createElement("button");
products.id = "products";
products.innerText = "Productos";
const cart = document.createElement("button");
cart.id = "cart";
cart.innerText = "Carrito";


box.appendChild(products);
box.appendChild(cart);

const prinBox = document.getElementById("page");
page.className = "page";

products.addEventListener("click", () => showCards(flowers));

let cartArray = [];

let counters = flowers.reduce((acc, flower) => {
    acc[flower.id] = 0;
    return acc;
}, {});

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

        const cont = document.createElement("button");        
        cont.innerText = counters[el.id];;
        cont.id = "counter_" + el.id

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

function modifyProducts (op, prodID) {
    if (op === "+"){
        counters[prodID] +=1;
    } else if (op === "-" && counters[prodID] > 0){
        counters[prodID] -=1;
    }
    const contadorEnDOM = document.getElementById("counter_" + prodID);

    // if (counters[prodID] >=0 )  {
    //     contadorEnDOM.innerText = counters[prodID];
    // }
    contadorEnDOM.innerText = counters[prodID];
    cartArray = flowers.filter((el) => counters[el.id] > 0)
}

function showCards(flowers) {
    prinBox.innerHTML ="";
    createCards(flowers)
}

cart.addEventListener("click", () => showCart(cartArray));

function createCart(cartArray) {
    if(cartArray.length === 0) {
        const anyProducts = document.createElement("p")
        anyProducts.innerText = "No hay productos en tu carrito"

        prinBox.appendChild(anyProducts)
    } else {
        cartArray.forEach((el) => {
            const row = document.createElement("div");
            row.id = "row"
    
            const img_row = document.createElement("img");
            img_row.src = el.img
            img_row.id = "img_row"
    
            const p_row = document.createElement("p");
            p_row.innerText = el.name + " " + counters[el]
    
            row.appendChild(img_row)
            row.appendChild(p_row)
            prinBox.appendChild(row);
        })
    }
    
}

function showCart(cartArray) {
    prinBox.innerHTML ="";
    createCart(cartArray)
    
}
console.log(cartArray)