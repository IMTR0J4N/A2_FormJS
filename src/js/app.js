import '../css/style.css';

let quantities = new Array();
let unitprices = new Array();
let prices = new Array();

const loadArr = () => {
  const inputs = document.querySelectorAll('input');

  for(const input of inputs) {
    if(input.name.startsWith('q')) {
      quantities.push(input);
    } else if(input.name.startsWith('pu')) {
      unitprices.push(input)
    } else if(input.name.startsWith('p')) {
      prices.push(input)
    }
  }

  console.log(quantities);
  console.log(unitprices);
  console.log(prices)
}

loadArr()

const total = document.querySelector('input[name="total"]');
const reset = document.querySelector('input[type="reset"]');
const submit = document.querySelector('input[type="button"]');

let oldQuantity = '', oldUnitPrice = '';

quantities.forEach(i => {
  i.addEventListener('input', () => {

    const unitprice = unitprices[quantities.indexOf(i)];
    const price = prices[quantities.indexOf(i)];

    if(i.value.length === 0) {
      price.value = '';
      renderTotal()
    } else if(i.value.length > 0 && unitprice.value.length > 0 && i.value.match(/(?<![A-Za-z0-9.])[0-9.]+/gmi)){
        price.value = parseInt(i.value) * parseInt(unitprice.value)
        oldQuantity = i.value
        renderTotal()
      } else if(i.value.match(/^[a-zA-Z0-9_.-]*$/)) {
        i.value = oldQuantity
      }else {
        i.value = '';
        renderTotal()
      }
  })
})

unitprices.forEach(i => {
  i.addEventListener('input', () => {

    const quantity = quantities[unitprices.indexOf(i)];
    const price = prices[unitprices.indexOf(i)];

    if (quantity.value.length > 0 && i.value.match(/(?<![A-Za-z0-9.])[0-9.]+/gmi)) {
      price.value = parseInt(quantity.value) * parseInt(i.value);
      oldUnitPrice = i.value;
      renderTotal()
  } else if (i.value.match(/^[a-zA-Z0-9_.-]*$)/)) {
    i.value = oldUnitPrice;
  }
})
})

prices.forEach(i => {
  i.disabled = true
})

total.disabled = true

submit.addEventListener('click', () => {
  const ul = document.querySelector('ul');
  const table = document.querySelector('table')
  const thxPage = document.createElement('div');
  const h1 = document.createElement('h1');

  h1.innerText = `Merci d'avoir passer commande (TOTAL : ${total.value.length > 0 ? total.value : "0"}CHF)`;
  thxPage.appendChild(h1);
  thxPage.classList.add('thxPage');

  table.style.display = 'none';
  ul.style.display = 'none';
  submit.style.display = 'none';
  reset.style.display = 'none';

  document.body.appendChild(thxPage);
})

reset.addEventListener('click', () => {
  window.location.reload()
})

const renderTotal = () => {
  total.value = "0";
  for(const price of prices) {
    console.log(parseInt(total.value) + parseInt(price.value))
    if(price.value.length > 0) {
      total.value = parseInt(total.value) + parseInt(price.value)
    }
  }
}