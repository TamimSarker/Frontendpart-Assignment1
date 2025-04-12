products = document.getElementById('products')
console.log(products.innerText)
let count = 0
let su = 0
fetch("https://fakestoreapi.com/products")
    .then((res) => res.json() )
    .then((data) => {
        console.log(data)
        show_data(data)
    }
)


function show_data(arr){
    arr.forEach((element) => {
       div = document.createElement("div") 
       div.innerHTML =`
       <img class="h-[80px] w-[80px]" src="${element.image}"> 
       <h1>${element.id}</h1>
       <p > ${element.title.slice(0,45)} </p>
       <p> Category: ${element.category} <p/>
       <p> Price: $${element.price} <p/>
       <div class="mt-[10px] flex justify-between">
        <button onclick="details('${element.id}')" class="bg-blue-600 rounded-sm px-[6px] py-[2px]">Details</button>
        <button onclick="addToCard('${element.price}')" class="bg-green-600 rounded-sm px-[6px] py-[2px] " >Add To Card</button> 
       </div>

       `
       div.classList.add('product')
       products.appendChild(div)
       
       console.log(element)
    });
}

cnt = document.getElementById("cnt")
function addToCard(element){
        count = count + 1
        if (count > 11) {
            alert("Card limit Exced")
            return
        }
        su = su + parseFloat(element)
        to = document.getElementById('total')
        sp = document.getElementById('sp')
        
        div = document.createElement("div")
        div.innerHTML = `
        <h1>Price :</h1>
        <h1>$${element}</h1>
        `
        div.classList.add("card1")
        card = document.getElementById("card")
        sp.innerText = count
        to.innerText = `Total :   $${su}`
        card.appendChild(div)
    
}


function details(e){
    
    fetch(`https://fakestoreapi.com/products/${e}`)
    .then((res) => res.json() )
    .then((data) => {
         
        d = data  
        mdl = document.getElementById("modal")
        if(mdl.children){
            div = document.createElement("div")
            div.innerHTML = `
                <img class="h-[80px] w-[80px]" src="${data.image}">
                <h1 class="text-blue-400 ">Title : ${data.title}<h1/>
                <p class="text-md text-blue-950">Category: ${data.category}</p>
                <p class="text-md">Price : $${data.price} </p>
                <button onclick="rem()" class="mt-[20px] bg-red-500 text-white rounded-md px-[10px] text-center py-[2px]"> Close </button>
                `
                mdl.replaceChild(div, mdl.firstElementChild)
                mdl.classList.add("mod")
                mdl.classList.remove("hidden")
        }else{
                div = document.createElement("div")
                div.innerHTML = `
                <img class="h-[80px] w-[80px] ml-[50px]" src="${data.image}">
                <h1> ${data.title}<h1/>
                <p class="text-red"> ${data.category}</p>
                <p> ${data.price} </p>
                `
                mdl.appendChild(div)
                mdl.classList.toggle("hidden")            
        }
    })
    
}

function rem(){
    mdl.classList.add("hidden")
}