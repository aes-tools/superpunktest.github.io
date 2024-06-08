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
        image: "loc.jpg",
        sku: "L02"
    },
    {
        band: "Leftover Crack 3",
        price: "2.00",
        image: "loc.jpg",
        sku: "L02"
    },
    {
        band: "Leftover Crack 4",
        price: "2.00",
        image: "loc.jpg",
        sku: "L02"
    },
]

function addProducts() {
    const patchCount = patches.length;

    for (let i = 0; i < patchCount; i++) {
        let newRow = document.createElement("div"),
            newCol = document.createElement("div"),
            newProduct = document.createElement("div"),
            productImage = document.createElement("div"),
            imageContent=document.createElement("img"),
            productTitle = document.createElement("div"),
            productPrice = document.createElement("div");

        newCol.classList.add("col-sm");
        newProduct.classList.add("row", "product-row");
        newCol.appendChild(newProduct);
        productImage.classList.add("col-12", "d-flex", "justify-content-center", "text-center");
        productTitle.classList.add("col-12", "d-flex", "justify-content-center", "text-center");
        imageContent.setAttribute('src', 'images/patches/' + patches[i].image);
        imageContent.classList.add("img-fluid", "product-image");
        productImage.appendChild(imageContent);
        newProduct.appendChild(productImage);
        productTitle.appendChild(document.createTextNode(patches[i].band));
        newProduct.append(productTitle);
        newRow.append(newCol);
        newRow.classList.add("row");
        newRow.classList.add("listing-row");


        console.log(productImage);


        if (i % 2 == 0) {
            document.getElementById("patches").appendChild(newRow);
        } else if (i == 1) {
            document.getElementsByClassName("listing-row").item(i - 1).append(newCol);
        } else {
            document.getElementsByClassName("listing-row").item([i - 2]).append(newCol);
    
    }

}
}

function testButton() {
    alert($(this).val())
}

addProducts();