let totalPriceCount = 0;
let DiscountedTotalPrice = 0;
let couponApplied = false;
let total = 0;

// Stop event bubbling when clicked on star rating so that the item 
// the item get aadded in the cart when user tries to rate the items individually

const stars = document.querySelectorAll('.rating');
stars.forEach(star => {
    star.addEventListener('click', function(e) {
      
        e.stopPropagation(); 
        console.log('Star Clicked');
   
    });});

//Add items in cart when anywhere in the card is clicked except the  rating stars
function addToCart(data) {


    console.log('parent')
    const itemName = data.children[2].innerText;
    document.getElementById('noItemAdded').classList.add('hidden');
    const cartList = document.getElementById('cartList');
    const li = document.createElement('li')
    li.innerText = itemName;
    cartList.appendChild(li);
    const button = document.getElementById('purchase');
    button.removeAttribute('disabled');

    const itemPrice = parseFloat(data.querySelector('span').innerText);
    countTotalPrice(itemPrice)
    document.getElementById('searchInput').value = '';

}

//Total price and subtotal price setter and when total is greater or equal 200, apply coupon gets enabled
function countTotalPrice(itemPrice) {

    totalPriceCount += itemPrice;
    const totalPriceInFloat = totalPriceCount.toFixed('2');
    const totalPriceHolder = document.getElementById('TotalPrice');
    totalPriceHolder.innerText = totalPriceInFloat;
    const SubtotalPriceHolder = document.getElementById('SubTotal');
    SubtotalPriceHolder.innerText = totalPriceInFloat;
    total = totalPriceInFloat;


    if (totalPriceInFloat > 200) {

        const couponButton = document.getElementById('couponBtn');
        couponButton.removeAttribute('disabled');
        discountPriceCalculation(totalPriceInFloat);
    }


}

//Apply coupon with error handling
document.getElementById('couponBtn').addEventListener('click', function () {

    const couponCodeGiven = document.getElementById('searchInput');
    if (couponCodeGiven.value == '') {
        alert('Please enter valid coupon code');
    } else if (couponCodeGiven.value != 'SELL200') {

        alert('The Coupon Code entered is not available')
        couponCodeGiven.value = '';
    } else if (couponApplied) { // Checking if the coupon given as input has already been applied
        alert('Coupon has already been applied');
        couponCodeGiven.value = '';
    } else {
        couponCodeGiven.value = '';
        couponApplied = true; 
        discountPriceCalculation(total);
    }


})


//Counting the discount price and changing value of subtotal according to the discount
function discountPriceCalculation(total) {

    if (total >= 200 && couponApplied == true) {
        DiscountedTotalPrice = total - total * (20 / 100);
        const discountPrice = document.getElementById('DiscountPrice');
        discountPrice.innerText = (total * (20 / 100)).toFixed('2');
        const SubtotalPriceHolder = document.getElementById('SubTotal');
        SubtotalPriceHolder.innerText = DiscountedTotalPrice.toFixed('2');
    }

}

//Opening the congratulations pop-up modal when purchase button is clicked

document.getElementById('purchase').addEventListener('click', function () {

    document.getElementById('congoModal').showModal();

})

//Reloading the page to set everything as it was as default when purchase is done, from the congratulations modal
document.getElementById('home').addEventListener('click', function () {
    // window.location.href = "index.html"
    let cartList= document.querySelectorAll('#cartList li');
   
    for (var i = 0; i < cartList.length; i++) {
        cartList[i].remove();
    }
    document.getElementById('TotalPrice').innerText=(0.00).toFixed('2');
    document.getElementById('SubTotal').innerText=(0.00).toFixed('2');
    document.getElementById('DiscountPrice').innerText=(0.00).toFixed('2');
    const pButtonOff = document.getElementById('purchase');
    const aButtonOff = document.getElementById('couponBtn');
    totalPriceCount = 0;
    DiscountedTotalPrice = 0;
    couponApplied = false;
    total = 0;
    pButtonOff.setAttribute('disabled',true);
    aButtonOff.setAttribute('disabled',true);
    document.getElementById('noItemAdded').classList.remove('hidden');

})