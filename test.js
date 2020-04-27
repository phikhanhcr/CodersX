var next = document.getElementById('next');
next.addEventListener('click', hi);
var pre = document.getElementById('pre');
pre.addEventListener('click', hello);
var total = parseInt(document.getElementById('total').innerHTML);
// so page
var perPage = Math.floor(total / 8);

// bien page 1 , 2 , 3 ban dau
var arr = Array.from(document.getElementsByClassName('page-number'));
var arrNumber = arr.map(ele => {
  return parseInt(ele.text);
}) // [1,2,3]
for (var i = 0; i < 3; i++) {
  arr[i].setAttribute('href', `/books?page=${arrNumber[i]}`);
}
function hi() {
  var arr = Array.from(document.getElementsByClassName('page-number'));
  var arrNumber = arr.map(ele => {
    return parseInt(ele.text);
  }) // [1,2,3]
  if (arrNumber[0] == 13) {
    arrNumber[1].text = "";
    arrNumber[2].text = "";
    return;
  }
  var newValue = arrNumber.map(ele => {
    return ele + 3;
  })
  console.log(newValue);
  for (var i = 0; i < 3; i++) {
    if (newValue[0] == 13) {
      arr[0].text = 13;
      arr[1].text = "";
      arr[2].text = "";
      arr[0].setAttribute('href', `/books?page=${13}`);

      arr[2].parentNode.setAttribute('style', 'display:none');
      arr[1].parentNode.setAttribute('style', 'display:none');
      return;
    }
    arr[i].text = newValue[i];
    arr[i].setAttribute('href', `/books?page=${newValue[i]}`);
  }
}
function hello() {
  var arr = Array.from(document.getElementsByClassName('page-number'));
  console.log(arr[0].text);
  if (arr[0].text == 13) {
    arr[1].text = 14;
    arr[2].text = 15;
  }
  var arrNumber = arr.map(ele => {
    return parseInt(ele.text);
  })
  console.log(arrNumber);
  if (arrNumber[0] == 1) {
    return;
  }
  var newValue = arrNumber.map(ele => {
    return ele - 3;
  })
  console.log(newValue)
  for (var i = 0; i < 3; i++) {
    arr[i].setAttribute('href', `/books?page=${newValue[i]}`);
    if (newValue[i] <= 0) {
      return;
    }
    arr[i].text = newValue[i];
  }