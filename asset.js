document
.querySelectorAll("#listprice , #loantype , #numberofunit , #downpayment , #rate")
.forEach((element) =>
    element.addEventListener("input", () => calculate())
);

var loantypee = document.getElementById("loantype");
var purchase = document.getElementById("listprice");

loantypee.addEventListener('change', updateDownpaymentOptions);


// Function to update downpayment options based on loan type
function updateDownpaymentOptions() {
downpayment.innerHTML = ''; // Clear existing options

switch (loantypee.value) {
    case 'CONVENTIONAL':
        downpayment.innerHTML += '<option value="3">3%</option>';
        downpayment.innerHTML += '<option value="5">5%</option>';
        downpayment.innerHTML += '<option value="10">10%</option>';
        downpayment.innerHTML += '<option value="15">15%</option>';
        downpayment.innerHTML += '<option value="20">20%</option>';
        downpayment.innerHTML += '<option value="25">25%</option>';
        break;
    case 'FHA':
        downpayment.innerHTML += '<option value="3.5">3.5%</option>';
        downpayment.innerHTML += '<option value="5">5%</option>';
        downpayment.innerHTML += '<option value="10">10%</option>';
        break;
    case 'VA':
        downpayment.innerHTML += '<option value="0">0%</option>';
        downpayment.innerHTML += '<option value="5">5%</option>';
        downpayment.innerHTML += '<option value="10">10%</option>';
        downpayment.innerHTML += '<option value="20">20%</option>';
        break;
    case 'USDA':
        downpayment.innerHTML += '<option value="0">0%</option>';
        break;
}
calculate();
return;
}
function calculate() {
// Get inputs
const listprice = Number(document.getElementById("listprice").value);
const loantype = (document.getElementById("loantype").value);
const downpayment = Number(document.getElementById("downpayment").value) / 100;
const rate = Number(document.getElementById("rate").value) / 100;


// Calculate 
var buydown;
var monthly = calculatebuydownRate(rate / 12, 360, (listprice * (1 - downpayment)), 0, 0);
if((rate) === 0){
    buydown  = 0
}  
else{
    buydown = rate - 0.01
} ;

var pandiFirst = calculatebuydownRate((rate - 0.01) / 12, 360, (listprice * (1 - downpayment)), 0, 0);
var text;
var estimatedSavings = (monthly - pandiFirst) * 12;
document.getElementById("pandi").textContent = formatValue(monthly);
document.getElementById("buydownRate").textContent = formatValue(buydown*100) + "%";
document.getElementById("pandi-first").textContent = formatValue(pandiFirst);
document.getElementById("pandi-left").textContent = formatValue(monthly);
document.getElementById("savings").textContent = formatValue(estimatedSavings);
document.getElementById("closing-cost").textContent = formatValue(5000 - estimatedSavings);
 
}


function num(evt) {
evt = evt ? evt : window.event;
var charCode = evt.which ? evt.which : evt.keyCode;
if (charCode == 46) {
    if (evt.target.value.indexOf(".") !== -1) {
        return false;
    } else {
        return true;
    }
}

if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
}

return true;
}
function formatValue(value, text) {
return isNaN(value) ? (text || "N/A") : Form.format(value);
}


var Form = new Intl.NumberFormat("en-US", {
style: "currency",
currency: "USD", // Change to EUR for Euros
minimumFractionDigits: 2,
maximumFractionDigits: 2,
});



function calculatebuydownRate(rate, numberOfPayments, presentValue) {
var monthlyInterestRate = rate;
var numerator = monthlyInterestRate * presentValue;
var denominator = 1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments);
return (numerator / denominator);
}

