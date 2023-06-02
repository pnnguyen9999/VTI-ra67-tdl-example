$(document).ready(function () {
    loadProductList();
});

const newProduct = {
    name: "Sony X5",
    price: "10.990.000 ₫",
    info: "6.9 inches, Chip MediaTek Helio G85 (12nm) mạnh mẽ, Ram 4G, Pin 7000 mAh",
    detail: "ProductDetail1",
    ratingStar: 5,
    imageName: "ImgMobile1.png",
    manufacturerId: 1,
    categoryId: 1,
};

const newProductUpdate = {
    name: "Sony X5 Updated",
    price: "15.990.000 ₫",
    info: "6.9 inches, Chip MediaTek Helio G85 (12nm) mạnh mẽ, Ram 4G, Pin 7000 mAh",
    detail: "ProductDetail1",
    ratingStar: 5,
    imageName: "ImgMobile1.png",
    manufacturerId: 1,
    categoryId: 1,
};

$("#btn-delete").click(function (e) {
    $.ajax({
        type: "DELETE",
        url: "https://6479e14aa455e257fa63f842.mockapi.io/products/10",
        success: function (response) {
            console.log(response);
            loadProductList();
        }
    });
});

$("#btn-add").click(function (e) {
    $.ajax({
        type: "POST",
        url: "https://6479e14aa455e257fa63f842.mockapi.io/products",
        data: newProduct,
        success: function (response) {
            console.log(response);
            loadProductList();
        }
    });
});

$("#btn-update").click(function (e) {
    $.ajax({
        type: "PUT",
        url: "https://6479e14aa455e257fa63f842.mockapi.io/products/10",
        data: newProductUpdate,
        success: function (response) {
            console.log(response);
            loadProductList();
        }
    });
});

function loadProductList() {
    $.ajax({
        type: "GET",
        url: "https://6479e14aa455e257fa63f842.mockapi.io/products",
        success: function (response) {
            console.log(response);
            const productItems = response.map((data) => {
                return productCard(data);
            });
            $("#product-list").empty();
            $("#product-list").append(productItems);
        }
    });
}

function productCard(data) {
    const buttonUpdate = `<button onclick="handleUpdate(${data.id})">Update</button>`;
    const buttonDelete = `<button onclick="handleDelete(${data.id})">Delete</button>`;
    return `<li>${data.name} - ${data.price} - ${buttonUpdate} - ${buttonDelete}</li>`;
}

function handleDelete(id) {
    $.ajax({
        type: "DELETE",
        url: `https://6479e14aa455e257fa63f842.mockapi.io/products/${id}`,
        success: function (response) {
            console.log(response);
            loadProductList();
        }
    });
}

function handleUpdate(id) {
    const uName = prompt('Nhập tên sản phẩm');
    const uPrice = prompt('Nhập giá');
    const uInfo = prompt('Nhập thông tin');
    const uDetail = prompt('Nhập chi tiết');
    const uRatingStar = prompt('Nhập uRatingStar');
    const uImage = prompt('Nhập uImage');
    const uManu = prompt('Nhập uManu');
    const uCategory = prompt('Nhập uCategory');

    const updateData = {
        name: uName,
        price: uPrice,
        info: uInfo,
        detail: uDetail,
        ratingStar: uRatingStar,
        imageName: uImage,
        manufacturerId: uManu,
        categoryId: uCategory,
    };
    $.ajax({
        type: "PUT",
        url: `https://6479e14aa455e257fa63f842.mockapi.io/products/${id}`,
        data: updateData,
        success: function (response) {
            console.log(response);
            loadProductList();
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}