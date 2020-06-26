import { populateChart,populateTotal,populateTable } from "./populate";
import { sendTransaction } from "./sendTransaction"

let transactions = []

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(reg => {
        console.log("We found your service worker file!", reg);
      });
  });
}

fetch("/api/transaction")
  .then(response => {
    return response.json();
  })
  .then(data => {
    // save db data on global variable
    transactions = data;

    populateTotal(transactions);
    populateTable(transactions);   
    populateChart(transactions);
  });

document.querySelector("#add-btn").onclick = function(event) {
  sendTransaction(true,transactions);
};

document.querySelector("#sub-btn").onclick = function(event) {
  sendTransaction(false,transactions);
};
