let patches = [];

async function patchesListing() {
    let shopContentsResponse = await fetch('./patches.json');
    let shopContents = await shopContentsResponse.json();
    console.log(shopContents);
    patches = shopContents;
    const currentPage = document.title.split(" - ").slice(1)[0];

    if (currentPage == "Patches" || currentPage == "Shirts") {
        addProducts();
        const modalButton = document.getElementById("exampleModal");

        modalButton.addEventListener('click', function () {
            localStorage.setItem("products", JSON.stringify(purchaseList));
        }, false);
    } else if (currentPage == "Cart") {
        createCart();
    }
}

patchesListing();

if (localStorage.getItem("products")) {
    purchaseList = localStorage.getItem("products");
    purchaseList = JSON.parse(purchaseList);
} else {
    purchaseList = {};
}

function addProducts() {
    const patchContainer = document.getElementById("patches");
    const imagePrefix = "images/patches/";

    for (let i = 0; i < patches.length; i++) {
        const patch = patches[i];

        const newRow = document.createElement("div");
        newRow.classList.add("row", "listing-row");

        const newCol = document.createElement("div");
        newCol.classList.add("col-sm");

        const newProduct = document.createElement("div");
        newProduct.classList.add("row", "product-row");

        const productImage = document.createElement("div");
        productImage.classList.add("col-12", "d-flex", "justify-content-center", "text-center");

        const imageContent = document.createElement("img");
        imageContent.setAttribute('src', imagePrefix + patch.image);
        imageContent.classList.add("img-fluid", "product-image");

        productImage.appendChild(imageContent);
        newProduct.appendChild(productImage);

        const productTitle = document.createElement("div");
        productTitle.classList.add("col-12", "d-flex", "justify-content-center", "text-center");
        productTitle.appendChild(document.createTextNode(patch.band));
        newProduct.appendChild(productTitle);

        const productPrice = document.createElement("div");
        productPrice.classList.add("col-12", "d-flex", "justify-content-center", "text-center");
        productPrice.appendChild(document.createTextNode("$" + patch.price));
        newProduct.appendChild(productPrice);

        const productQuantity = document.createElement("div");
        productQuantity.classList.add("col-12", "d-flex", "justify-content-center", "text-center", "form-outline");
        const quantityInput = document.createElement("input");
        quantityInput.classList.add("quantity-input", "form-control");
        quantityInput.setAttribute('type', 'number');
        quantityInput.setAttribute('value', 1);
        quantityInput.setAttribute('id', patch.sku);
        productQuantity.appendChild(quantityInput);
        newProduct.appendChild(productQuantity);


        const addToCart = document.createElement("div");
        addToCart.classList.add("col-12", "d-flex", "justify-content-center", "text-center");
        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("btn", "btn-dark");
        addToCartButton.setAttribute("data-bs-toggle", "modal");
        addToCartButton.setAttribute("data-bs-target", "#exampleModal");
        addToCartButton.setAttribute('value', patch.sku);
        addToCartButton.appendChild(document.createTextNode("Add to Cart"));
        addToCart.appendChild(addToCartButton);
        newProduct.appendChild(addToCart);
        addToCartButton.addEventListener('click', function () {
            const dialog = document.getElementById("modal-body");
            while (dialog.firstChild) {
                dialog.removeChild(dialog.firstChild);
            }
            const updatedDialog = document.createElement("p");
            updatedDialog.classList.add("wrap");
            dialog.appendChild(updatedDialog);
            const quantity = document.getElementById(this.value).value;
            const productCode = this.value;
            if (purchaseList[productCode]) {
                purchaseList[productCode] += parseInt(quantity);
            } else {
                purchaseList[productCode] = parseInt(quantity);
            }
            updatedDialog.appendChild(document.createTextNode(quantity + " x " + patch.band + " added to your list."));
        }, false);

        newCol.appendChild(newProduct);
        newRow.appendChild(newCol);
        if (i % 2 === 0) {
            patchContainer.appendChild(newRow);
        } else {
            const lastRow = patchContainer.lastChild;
            if (lastRow && lastRow.classList.contains("listing-row")) {
                lastRow.appendChild(newCol);
            }
        }
    }
}

function createCart() {
    for (const key in purchaseList) {
        //   document.getElementById("cart").append(purchaseList[key] + key + ",");
        for (const value of patches) {
            if (value.sku == key) {
                const cartBody = document.getElementById("cart"),
                    cartRow = document.createElement("div"),
                    cartItemImage = document.createElement("div"),
                    productImage = document.createElement("img"),
                    titleAndPriceRow = document.createElement("div"),
                    cartItemTitle = document.createElement("div"),
                    productTitle = document.createElement("p"),
                    cartItemPrice = document.createElement("div"),
                    productPrice = document.createElement("p"),
                    quantityAndButtonRow = document.createElement("div"),
                    cartQuantityBox = document.createElement("div"),
                    productQuantityBox = document.createElement("input"),
                    cartItemButton = document.createElement("div"),
                    productButton = document.createElement("button");

                cartRow.classList.add("row", "align-items-center", "text-center", "product-row");
                cartItemImage.classList.add("col-4");
                cartItemTitle.classList.add("col-12");
                titleAndPriceRow.classList.add("row", "col-8");
                cartItemPrice.classList.add("col-12");
                quantityAndButtonRow.classList.add("row");
                cartQuantityBox.classList.add("col-6");
                productImage.setAttribute("src", "images/patches/" + value.image);
                productImage.classList.add("img-fluid");
                cartItemImage.append(productImage);
                productTitle.appendChild(document.createTextNode(value.band));
                cartItemTitle.append(productTitle);
                titleAndPriceRow.append(cartItemTitle);
                productPrice.appendChild(document.createTextNode("$" + value.price));
                cartItemPrice.append(productPrice);
                titleAndPriceRow.append(cartItemPrice);
                productQuantityBox.classList.add("cart-quantity-input", "form-control");
                productQuantityBox.setAttribute('type', 'number');
                productQuantityBox.setAttribute('value', purchaseList[key]);
                productQuantityBox.setAttribute('id', value.sku);
                cartItemButton.classList.add("col-6");
                productButton.classList.add("btn", "btn-dark", "cart-button");
                productButton.setAttribute("data-bs-toggle", "modal");
                productButton.setAttribute("data-bs-target", "#exampleModal");
                productButton.setAttribute('value', value.sku);
                productButton.appendChild(document.createTextNode("Update Cart"));

                cartQuantityBox.append(productQuantityBox);
                cartItemButton.append(productButton);

                productButton.addEventListener('click', function () {
                    const dialog = document.getElementById("modal-body");
                    while (dialog.firstChild) {
                        dialog.removeChild(dialog.firstChild);
                    }
                    const updatedDialog = document.createElement("p");
                    updatedDialog.classList.add("wrap");
                    dialog.appendChild(updatedDialog);
                    const quantity = document.getElementById(this.value).value;
                    const productCode = this.value;
                    if (purchaseList[productCode]) {
                        if (quantity > 0) {
                            purchaseList[productCode] = parseInt(quantity);
                            localStorage.setItem("products", JSON.stringify(purchaseList));
                            updatedDialog.appendChild(document.createTextNode("You now have " + quantity + " x " + value.band + " on your list."));
                            console.log("success");
                        } else {
                            delete purchaseList[productCode];
                            localStorage.setItem("products", JSON.stringify(purchaseList));
                            while (document.getElementById("cart").firstChild) {
                                document.getElementById("cart").removeChild(document.getElementById("cart").firstChild);
                            }
                            updatedDialog.appendChild(document.createTextNode(value.band + " removed from your list."));
                            createCart();
                        }
                    } else {
                        purchaseList[productCode] = parseInt(quantity);
                    }
                }, false);

                quantityAndButtonRow.append(cartQuantityBox);
                quantityAndButtonRow.append(cartItemButton);

                cartRow.append(cartItemImage);
                cartRow.append(titleAndPriceRow);
                cartRow.append(quantityAndButtonRow);
                cartBody.append(cartRow);
                //document.getElementById("cart").append(value.band + " ");
            }
        }
    }
}

/*
addToCartButton.addEventListener('click', function () {
    const dialog = document.getElementById("modal-body");
    while (dialog.firstChild) {
        dialog.removeChild(dialog.firstChild);
    }
    const updatedDialog = document.createElement("p");
    updatedDialog.classList.add("wrap");
    dialog.appendChild(updatedDialog);
    const quantity = document.getElementById(this.value).value;
    const productCode = this.value;
    if (purchaseList[productCode]) {
        purchaseList[productCode] += parseInt(quantity);
    } else {
        purchaseList[productCode] = parseInt(quantity);
    }
    updatedDialog.appendChild(document.createTextNode(quantity + " x " + patch.band + " added to your list."));
}, false);*/
/*
find items that are in purchase list and match them to item list based on object key value
list each one on their own row on the cart page, pulling info from item array (images, patch name, price) and purchaseList info (quantity)*/
