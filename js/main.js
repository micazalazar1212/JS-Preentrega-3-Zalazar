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

const prinBox = document.getElementById("page")
page.className = "page"

products.addEventListener("click", () => showCards(flowers));

function showCards(flowers) {
    
    flowers.forEach(el => {
        const card = document.createElement("div");
        card.className = "cardStyle"

        const img = document.createElement("img");
        img.src = el.img
        img.className = "imgCards"

        card.appendChild(img);

        page.appendChild(card)
    })

    

}