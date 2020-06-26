import { populateChart,populateTotal,populateTable } from "./populate";
import { sendTransaction } from "./sendTransaction"

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
    const transactions = data;

    populateTotal(transactions);
    populateTable(transactions);
    populateChart(transactions);
  });

document.querySelector("#add-btn").onclick = function() {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function() {
  sendTransaction(false);
};
