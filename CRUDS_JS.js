// CREATE
// READ
// UPDATE
// DELETE
// SEARCH

// HEAD OF SITE
let proname = document.getElementsByClassName("proname")[0];
let resetbtn = document.getElementsByClassName("resetbtn")[0];

// BODY INPUTS OF SITE
let price = document.getElementsByClassName("price")[0];
let taxes = document.getElementsByClassName("taxes")[0];
let ads = document.getElementsByClassName("ads")[0];
let discount = document.getElementsByClassName("discount")[0];
let total = document.getElementsByClassName("total")[0];
let count = document.getElementsByClassName("count")[0];
let category = document.getElementsByClassName("category")[0];
let search = document.getElementsByClassName("search")[0];
let searchByC = document.getElementsByClassName("searchByC")[0];

// BTNS OF SITE
let create = document.getElementsByClassName("create")[0];
let bntsearch = document.getElementsByClassName("bntsearch")[0]; 
let bntsearchByC = document.getElementsByClassName("bntsearchByC")[0]; 
let deleteall = document.getElementsByClassName("deleteall")[0];
let seeall = document.getElementsByClassName("seeall")[0];

// The calculation for the total price

function getTotal(){
    if(price.value != ""){
        let  totalPrice = (+price.value + +taxes.value + +ads.value - +discount.value)

        total.innerHTML = totalPrice
        total.style.color = `green`
    }else if(price.value === ``){
        total.innerHTML = ``
        total.style.color = `#b3f4ff`
    }
}

let proup;

// CREATE

// this array head of this project data

let prodata;

// add pro

if(localStorage.product != null){
    prodata = JSON.parse(localStorage.product)
}
else{
prodata = [];
}
create.onclick = function(){
    let proInfo = {
        title: proname.value.trim(),
        price: price.value.trim(),
        taxes: taxes.value.trim(),
        ads: ads.value.trim(),
        discount: discount.value.trim(),
        total: total.innerHTML.trim(),
        count: count.value.trim(),
        category: category.value.trim(),
    };
    
    // CLEAN DATA

if (proname.value.trim() === `` || price.value.trim() === `` || category.value.trim() === ``){
    alert(`please add your product info.`)
    return;
}else if(total.innerHTML === ``){
    alert(`This product has no price.`)
    return;
}else if(count.value.trim() >= 50000){
    alert(`It is not feasible to process 50,000 products in a single production run; please reduce the count.`)
    return;
}else if(count.value.trim() < 0 || total.innerHTML.trim() < 0){
    alert(`Negative numbers are not suitable.`)
    return;
}


// Count


if(proup !== undefined){
    prodata[proup] = proInfo;
    proup = undefined;
    create.textContent = `Create`
}
else if(count.value > 1){
for(let t = 0; t < count.value; t++){
prodata.push (proInfo);
}}  
else{
    prodata.push (proInfo)
}

localStorage.setItem(`product`, JSON.stringify(prodata));

reset()
showdata()
}


// clear data


function reset(){
    proname.value = ``
    price.value = ``
    taxes.value = ``
    ads.value = ``
    discount.value = ``
    total.innerHTML = ``
    count.value = ``
    category.value = ``
}

resetbtn.onclick = function(){
    proname.value = ``
    price.value = ``
    taxes.value = ``
    ads.value = ``
    discount.value = ``
    total.innerHTML = ``
    count.value = ``
    category.value = ``
    hamada()
}


// READ


function showdata(){
    let table= ``;
    for(let i = 0 ; i < prodata.length ; i++){

        // Vulnerable to XSS attacks

        table += `
            <tr>
                <td>${i +   1}</td>
                <td>${prodata[i].title}</td>
                <td>${prodata[i].price}</td>
                <td>${prodata[i].taxes}</td>
                <td>${prodata[i].ads}</td>
                <td>${prodata[i].discount}</td>
                <td>${prodata[i].total}</td>
                <td>${prodata[i].category}</td>
                <td><button onclick="proupdate(${i})" class="update">update</button></td>
                <td><button onclick="prodelete(${i})" class="delete">delete</button></td>
            </tr>`
    }
    deleteall.textContent = `DELETE ALL (${prodata.length})`
    document.getElementById(`tbodytable`).innerHTML = table;
        

    if(prodata.length === 0){
        deleteall.style.display = 'none'
    }else{
        deleteall.style.display = 'revert'
    }
}
showdata()


// DELETE


function prodelete(i){
    prodata.splice (i, 1);
    localStorage.product = (     JSON.stringify(prodata)   );
    hamada()
    showdata()
}


// DELETE ALL


deleteall.onclick = function(){
    if(prodata != null && localStorage.product != null){
        prodata.splice(0, prodata.length)
        localStorage.clear();
    }
    hamada()
    showdata()
}


// UPDATE


function proupdate(i){

    proname.value = prodata[i].title
    price.value = prodata[i].price
    taxes.value = prodata[i].taxes
    ads.value = prodata[i].ads
    discount.value = prodata[i].discount
    total.innerHTML = prodata[i].total
    count.value = ``
    category.value = prodata[i].category
    proup = i
    create.textContent = `Save`

showdata()
}

function hamada(){
    if (proup !== undefined){
    proup = undefined
    create.textContent = `Create`
    reset()
    showdata()
}}

// SEARCH (The final stage)


// Bnt Search By Name


bntsearch.onclick = function(){ 
        let tableSearched = ``;
    // CLEAN SEARCH
    if(searchByC.value !== ``){
        alert(`please Use Search By category`)
        return;
    }
    if(search.value === ``){
        alert (`Enter what you want to search for`)
        return;
    }else{
        let found = false;
        for(let i = 0; i < prodata.length; i++){
            if(prodata[i].title.toLowerCase().includes(search.value.toLowerCase()) === true){
                found = true;
                tableSearched += `
            <tr style="color: green;">
                <td>${i +   1}</td>
                <td>${prodata[i].title}</td>
                <td>${prodata[i].price}</td>
                <td>${prodata[i].taxes}</td>
                <td>${prodata[i].ads}</td>
                <td>${prodata[i].discount}</td>
                <td>${prodata[i].total}</td>
                <td>${prodata[i].category}</td>
                <td><button onclick="proupdate(${i})" class="update">update</button></td>
                <td><button onclick="prodelete(${i})" class="delete">delete</button></td>
            </tr>`
            }
    }if(found === true){document.getElementById(`tbodytable`).innerHTML = tableSearched;seeall.style.display = `inline-block`;} 
        
    if(found === false){
        alert (`Not found.`)
        return;
    }
}}   

// Bnt Search By Category

bntsearchByC.onclick = function(){ 
        let tableSearched = ``;
    // CLEAN SEARCH
    if(search.value !== ``){
        alert(`please Use Search By Name`)
        return; 
    }
    if(searchByC.value === ``){
        alert (`Enter what you want to search for`)
        return;
    }else{
        let found = false;
        for(let i = 0; i < prodata.length; i++){
            if(prodata[i].category.toLowerCase().includes(searchByC.value.toLowerCase()) === true){
                found = true;
                tableSearched += `
            <tr style="color: green;">
                <td>${i +   1}</td>
                <td>${prodata[i].title}</td>
                <td>${prodata[i].price}</td>
                <td>${prodata[i].taxes}</td>
                <td>${prodata[i].ads}</td>
                <td>${prodata[i].discount}</td>
                <td>${prodata[i].total}</td>
                <td>${prodata[i].category}</td>
                <td><button onclick="proupdate(${i})" class="update">update</button></td>
                <td><button onclick="prodelete(${i})" class="delete">delete</button></td>
            </tr>`
            }
    }if(found === true){document.getElementById(`tbodytable`).innerHTML = tableSearched;seeall.style.display = `inline-block`;} 
        
    if(found === false){
        alert (`Not found.`)
        return;
    }
}}   

seeall.onclick = function(){
    search.value = ``
    searchByC.value = ``
    seeall.style.display = `none`
    showdata()
}