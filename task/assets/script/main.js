import {  getAllCategories,getCategoryById,deleteCategoryById,postCategoryById,EditCardyById} from "./htprequests.js";

let list=document.querySelector("#categories")
let detail=document.querySelector("#detail")
getAllCategories().then(data=>{
    data.forEach(category => {
        list.innerHTML+=`<li>${category.name}</li>`
    });
})

getCategoryById(4).then(data=>{
    detail.textContent=`${data.name}, desc: ${data.description}`
})
deleteCategoryById(4)

postCategoryById( {name: 'salamlar', description: '1235'});

EditCardyById(3,{name:'salam',description:'salam123'})