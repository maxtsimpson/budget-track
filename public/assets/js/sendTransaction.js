import { populateChart,populateTotal,populateTable } from "./populate";
import { saveRecord } from "./db";

export function sendTransaction(isAdding) {
    console.log("in sendTransaction")
    let nameEl = document.querySelector("#t-name");
    let amountEl = document.querySelector("#t-amount");
    let errorEl = document.querySelector(".form .error");
  
  
    // validate form
    if (nameEl.value === "" || amountEl.value === "") {
      errorEl.textContent = "Missing Information";
      return;
    }
    else {
      errorEl.textContent = "";
    }
  
    // create record
    let transaction = {
      name: nameEl.value,
      value: amountEl.value,
      date: new Date().toISOString()
    };
  
    // if subtracting funds, convert amount to negative number
    if (!isAdding) {
      transaction.value *= -1;
    }
  
    // add to beginning of current array of data
    transactions.unshift(transaction);
  
    // re-run logic to populate ui with new record
    console.log("about to populate charts")
    populateChart();
    populateTable();
    populateTotal();
    // also send to server
    console.log("posting to mongo")
    fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
    .then(response => {    
      return response.json();
    })
    .then(data => {
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      }
      else {
        // clear form
        nameEl.value = "";
        amountEl.value = "";
      }
    })
    .catch(err => {
      console.log("post to mongo failed")
      console.error(err)
      // fetch failed, so save in indexed db
      saveRecord(transaction);
  
      // clear form
      nameEl.value = "";
      amountEl.value = "";
    });
  }