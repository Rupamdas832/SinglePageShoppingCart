const menu = [
    {
        id: 1,
        title: "Buttermilk pancakes",
        category: "Breakfast",
        price: 15.99,
        img: "./images/Pancakes.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 2,
        title: "Dosa Sambar",
        category: "Dinner",
        price: 13.99,
        img: "./images/dosa.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 3,
        title: "Butter panner",
        category: "Dinner",
        price: 16.50,
        img: "./images/ButterPaneer.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 4,
        title: "Conflakes",
        category: "Breakfast",
        price: 8.99,
        img: "./images/cornflakes.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 5,
        title: "Chicken Biryani",
        category: "Lunch",
        price: 15.00,
        img: "./images/ChickenBiryani.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 6,
        title: "Egg Roll",
        category: "Dinner",
        price: 10.99,
        img: "./images/Eggroll.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 7,
        title: "Fried Egg Maggie",
        category: "Breakfast",
        price: 12.99,
        img: "./images/maggie.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 8,
        title: "Ludiyana Butter Masala and Roti",
        category: "Lunch",
        price: 27,
        img: "./images/ludhiyana.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 9,
        title: "Pav Bhaji",
        category: "Dinner",
        price: 22,
        img: "./images/PavBhaji.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 10,
        title: "Banana MilkShake",
        category: "Shakes",
        price: 13.45,
        img: "./images/BananaMilkshake.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    },
    {
        id: 11,
        title: "Protien Shake",
        category: "Shakes",
        price: 25.45,
        img: "./images/2.jpg",
        desc: "I am baby woke milkshake wolf bitters live-edge blue bottel, hammock freegan copper mug whatever cold-pressed"
    }
]

if(document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded",ready)
} else {
    ready()
}

function ready() {
    displayMenuItems(menu);
    displayMenuButtons();

    var removeBtns = document.getElementsByClassName("remove-btn")
    for(var i = 0 ; i<removeBtns.length; i++){
        const removebtn = removeBtns[i];
        removebtn.addEventListener("click",removeItem)
    }
    
    var addItemToCartBtns = document.getElementsByClassName("add-btn")
    for(var i = 0 ; i<addItemToCartBtns.length; i++){
        const addButton = addItemToCartBtns[i];
        addButton.addEventListener("click", addToCartBtnClicked)
    }
    
    var purchaseButton = document.getElementsByClassName("purchase")[0]
    purchaseButton.addEventListener("click", purchase)

}
function displayMenuItems(menuItems) {
    //const divElement = document.createElement("article")
    //divElement.classList.add("menu-item")
    var leftSection = document.getElementsByClassName("left-section")[0]
        
    let text = menuItems.map((item) => {
        return `<article class="menu-item">
    <img src=${item.img} class="photo" alt="menu item"/>
    <div class="item-info">
        <header class="item-header">
            <h4 class="item-title">${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
        </header>
        <p class="item-text">
            ${item.desc}
        </p>
        <button class="add-btn">ADD</button>
        </article>`
    })
    text = text.join("")
    leftSection.innerHTML = text;
    
}
const container = document.querySelector(".btn-container")
function displayMenuButtons() {
    const categories = menu.reduce((values, item) => {
        if(!values.includes(item.category)) {
            values.push(item.category)
        }
        return values;
    },["All"]
    )
    const categoryBtns = categories.map((category) => {
        return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`
    }).join("")
    container.innerHTML = categoryBtns;
    const filterBtns = container.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const category = e.currentTarget.dataset.id
            const menuCategory = menu.filter((menuItem) =>{
                if(menuItem.category === category){
                    
                    return menuItem;
                }
            });
                if(category === "All"){
                    displayMenuItems(menu)
                    var addItemToCartBtns = document.getElementsByClassName("add-btn")
                    for(var i = 0 ; i<addItemToCartBtns.length; i++){
                        const addButton = addItemToCartBtns[i];
                        addButton.addEventListener("click", addToCartBtnClicked)
                    }
                }
                else {
                    displayMenuItems(menuCategory)
                    var addItemToCartBtns = document.getElementsByClassName("add-btn")
                    for(var i = 0 ; i<addItemToCartBtns.length; i++){
                        const addButton = addItemToCartBtns[i];
                        addButton.addEventListener("click", addToCartBtnClicked)
                    }
                }
            
        })
    })
}

function addToCartBtnClicked(e){
    const element = e.target.parentElement.parentElement
    const title = element.getElementsByClassName("item-title")[0].innerText
    const price = element.getElementsByClassName("price")[0].innerText
    
    //check duplicate items in cart
    var cartRows = document.getElementsByClassName("cart-item")
    for(var i = 0 ; i<cartRows.length; i++){
        var cartRow = cartRows[i];
        var cartTitle = cartRow.getElementsByClassName("cartItem-title")[0].innerText
        if(cartTitle == title){
            alert(`${title} already exist in the Cart`)
            return
        }
    }
    addItemToCart(title, price);
}

function addItemToCart(title, price){
    const divRow = document.createElement("div")
    divRow.classList.add("cart-item")
    const cartItems = document.getElementsByClassName("cart-items")[0]
    const text = `<h4 class="cartItem-title">${title}</h4>
    <p class="item-price">${price}</p>
    <button class="remove-btn">Remove</button>
    `;
    divRow.innerHTML = text;
    cartItems.appendChild(divRow)
    
    divRow.getElementsByClassName("remove-btn")[0].addEventListener("click", removeItem)
    updateCart();
}
function updateCart() {
    const cartItems = document.getElementsByClassName("cart-items")[0]
    const cartRows = cartItems.getElementsByClassName("cart-item")

    var total = 0;
    for(var i = 0 ; i<cartRows.length; i++){
        var cartRow = cartRows[i];
        const priceElement = cartRow.getElementsByClassName("item-price")[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        total = Math.round((total + price)*100)/100;
        
    }
    const totalAmount = document.getElementsByClassName("total-amount")[0]
    totalAmount.textContent = "$" + total;
}

function removeItem(e) {
    const element = e.target.parentElement
            element.remove();
            updateCart();
}

function purchase() {
    const cartRows = document.getElementsByClassName("cart-item")
    if(cartRows.length === 0){
        alert("No items to be purchase")
        return
    }
    alert("All items purchased successfuly")
    const cartItems = document.getElementsByClassName("cart-items")[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    const totalAmount = document.getElementsByClassName("total-amount")[0]
    totalAmount.textContent = "$" + 0;
}