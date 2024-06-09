const patches = [
    {
        band: "Leftover Crack",
        price: "2.00",
        image: "loc.jpg",
        sku: "L01"
    },
    {
        band: "Leftover Crack 2",
        price: "2.00",
        image: "loc2.png",
        sku: "L02"
    },
    {
        band: "Leftover Crack 3",
        price: "2.00",
        image: "loc2.png",
        sku: "L03"
    },
    {
        band: "Leftover Crack 4",
        price: "2.00",
        image: "loc.jpg",
        sku: "L04"
    },
];

let purchaseList;

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

addProducts();



const modalButton = document.getElementById("exampleModal");


modalButton.addEventListener('click', function () {
    localStorage.setItem("products", JSON.stringify(purchaseList));
}, false);