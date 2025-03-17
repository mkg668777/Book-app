document.addEventListener("DOMContentLoaded" , function(){
    
let togglebtn = document.querySelector(".mode");
const dark = document.querySelector("#moon1");
const light = document.querySelector("#sun1");
const navbar = document.querySelector(".navbar");

//Display Book
const rightPart = document.querySelector(".rightPart");
const right_mainContainer = document.querySelector(".right-main-container");

// const mainLeftContainer= document.querySelector(".main-leftContainer");
const mainHeading = document.querySelector(".main-heading");

//List of book name

const Listname_APIurl = "https://books-backend.p.goit.global/books/category-list";
const leftpart = document.querySelector(".leftPart");
const topLeft = document.querySelector(".top-left");


togglebtn.addEventListener("click",(e)=>{
    
    if(togglebtn.classList.contains("light-mode") === true){
        togglebtn.classList.remove("light-mode");
        togglebtn.classList.add("dark-mode");

//       //set dark mode
      navbar.style.backgroundColor="white";
      document.body.style.backgroundColor = "white";
      light.style.backgroundColor="white";   
      navbar.style.color = "black";
      navbar.style.border = "2px solid black";
      dark.style.backgroundColor="white";
      topLeft.style.color="grey";
      
    
       //display:block for sun 
        document.querySelector("#sun1").style.display = "block";
        document.querySelector("#moon1").style.display ="none";
    }
    else{
        //check for dark mode
        togglebtn.classList.remove("dark-mode");
        togglebtn.classList.add("light-mode");
         //set light mode
        
         navbar.style.backgroundColor = "black";
         document.body.style.backgroundColor = " rgb(35, 33, 33)";
         light.style.backgroundColor="black";
         navbar.style.color ="white";
        //  navbar.style.border = "1px solid white";
         dark.style.backgroundColor="black";
         topLeft.style.color="black";


        //display:none for sun
        document.querySelector("#moon1").style.display = "block";
        document.querySelector("#sun1").style.display ="none";
        
    }
});





//Book Data 
async function fetchBookAPI(BooksPageName){
    const API_URL = BooksPageName ?
    `https://books-backend.p.goit.global/books/category?category=${BooksPageName}`:`https://books-backend.p.goit.global/books/top-books`;
       try{
        const response = await fetch(API_URL);
        const result = await response.json();
        // console.log(result);
        displayBook(result);
    }
    catch(error){
        console.log(error);
    }
    }

    //Display book function 
function displayBook(data){
    mainHeading.innerHTML = "";
    rightPart.innerHTML = "";

const fragment = document.createDocumentFragment();

const bookHeading = document.createElement("h1");
bookHeading.classList.add("book-Heading");

if(Array.isArray(data) && data.length > 0 && data[0].books){
    let booksArr = [];
  
    data.forEach((category) => {
    booksArr = booksArr.concat(category.books);
});
    data = booksArr;
    bookHeading.innerHTML = `ALL <span class='last-word'>CATEGORIES</span> `;
}
else if(data.length > 0){
    let word = data[0].list_name.trim().split(" ");
    let lastWord = word.pop() || "";
    let remainingWord = word.join(" ");
    bookHeading.innerHTML = `${remainingWord} <span class="last-word" > ${lastWord}</span>`;
}

data.forEach((obj)=>{
    const bookParent = document.createElement("div");
    bookParent.classList.add("book-parent");

    const imgDiv = document.createElement("div");
   
    imgDiv.classList.add("img-div");
    
    const bookImage = document.createElement("img");
     bookImage.classList.add("book-image");
     bookImage.src = obj.book_image;

     const bookName = document.createElement("h2");
     bookName.classList.add("book-Name");
     bookName.innerText = obj.title;

     const bookAuthor = document.createElement("p");
     bookAuthor.classList.add("book-Author");
     bookAuthor.innerText = obj.author;
     
     const quickView = document.createElement("div");
     quickView.classList.add("quick-view");
     quickView.innerText = "Quick View";
    
     imgDiv.append(bookImage , quickView);
     bookParent.append(imgDiv, bookName ,bookAuthor);
     fragment.append(bookParent);

})
mainHeading.append(bookHeading);
rightPart.append(fragment);
right_mainContainer.append(mainHeading ,rightPart);  
}


fetchBookAPI();




// console.log(Listname_APIurl);

async function fetchListName_Url(){
    try{
        const response = await fetch(Listname_APIurl);
        const result = await response.json();
        // console.log(result);
        displayListName(result);
    }catch(error){
        console.log(error);
    }
}
fetchListName_Url();


function displayListName(data){

    const allCategory = document.createElement("a");
    allCategory.classList.add("list-name","all-category");
   
    allCategory.innerText="ALL CATEGORIES";
    
    allCategory.addEventListener("click",(e)=>{
    e.preventDefault();
    fetchBookAPI();
});


   const allCategoryParent = document.createElement("div");
   allCategoryParent.classList.add("parent");

   allCategoryParent.append(allCategory);
    topLeft.append(allCategoryParent);


 data.forEach((obj) =>{

    const  parent = document.createElement("div");
    const listName = document.createElement("a");
   
    parent.classList.add("parent");
    listName.classList.add("list-name");
 
    listName.innerText = obj.list_name;

    listName.addEventListener("click",(e)=>{
        e.preventDefault();
        fetchBookAPI(obj.list_name);
    });

    parent.append(listName);
    topLeft.append(parent);

   })
   leftpart.append(topLeft);

}

//Support Ukraine 
const logoContainer = document.querySelector(".container");
const moveIcon = document.querySelector(".move-icon");
let isBottom = false;

moveIcon.addEventListener("click",()=>{
    let scrollHeight = logoContainer.scrollHeight;
    if(isBottom){
        scrollHeight = 0 ;
        isBottom = false;
        document.querySelector(".move-icon i").classList.remove("fa-angle-up");
        document.querySelector(".move-icon i").classList.add("fa-angle-down");
    }
    logoContainer.scrollTo(
        {   top : scrollHeight  ,
            behavior: "smooth",
    });
    if(scrollHeight > 0){
        isBottom = true;
    }
    if(isBottom){
        document.querySelector(".move-icon i").classList.remove("fa-angle-down");
        document.querySelector(".move-icon i").classList.add("fa-angle-up");
    }

});
});