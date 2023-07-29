"use strict";

const d = document;
const form = d.querySelector(".form");
const orderInfoList = d.querySelector(".order-info-list");
const dayOfDeliveryText = d.querySelector(".day-of-delivery-text");
const paymentTypeText = d.querySelector(".payment-type-text");
const orderCommentsInput = d.querySelector(".order-comments-input");
const orderInfoSection = d.querySelector(".order-info-section");
const orderCommentsText = d.querySelector(".order-comments-text");

// data structures
const orderItems = new Set();
let paymentMethod = "Payment in the store";
let dayOfDelivery = "";

// Form handler -------------------------------------------------
form.addEventListener("click", function (e) {
  // Update the order set on each click on the checkbox
  if (
    e.target.className === "form-check-input checkbox" &&
    !orderItems.has(e.target.value)
  ) {
    orderItems.add(e.target.value);
  } else {
    orderItems.delete(e.target.value);
  }

  // Update the payment method
  if (e.target.className === "form-check-input radio") {
    paymentMethod = e.target.value;
  }

  // Update the day of delivery
  if (e.target.className === "form-select") {
    dayOfDelivery = e.target.value;
  }
});

// Submit button click handler ---------------------------------------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Show the order info section if the user has placed an order
  if (orderItems.size !== 0) {
    orderInfoSection.classList.remove("d-none");
  } else {
    orderInfoSection.classList.add("d-none");
  }

  // Fill in the order info list
  orderInfoList.innerHTML = "";

  orderItems.forEach(function (value) {
    let li = d.createElement("li");
    li.appendChild(d.createTextNode(value));
    orderInfoList.appendChild(li);
  });

  // Fill in the payment type
  paymentTypeText.innerText = paymentMethod;

  // Fill in the day of delivery
  dayOfDeliveryText.innerText = dayOfDelivery;

  // Fill in the order comments list
  if (orderCommentsInput.value.length !== 0) {
    orderCommentsText.innerText = orderCommentsInput.value;
  } else {
    orderCommentsText.innerText = "None";
  }

  // Clear form data after submit
  form.reset();
});
