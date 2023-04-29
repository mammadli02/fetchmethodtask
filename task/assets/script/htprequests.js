const baseURL="https://northwind.vercel.app/api"
export const getAllCategories= async() =>{
    let globalData;
     await fetch(`${baseURL}/categories`)
    .then(response=>response.json())
    .then(data=> {
   globalData = data
    })
return globalData;
}

export const getCategoryById=async(id)=>{
    let globalData;
    await fetch(`${baseURL}/categories/${id}`)
    .then(response=>response.json())
    .then(data=>{
        globalData=data;
    })
    return globalData;
}

export const deleteCategoryById=async(id)=>{
    let globalData;
    await fetch(`${baseURL}/categories/${id}`,{
        method: 'DEETE'
    })
    
    return globalData;
}



export const postCategoryById=async(category)=>{;
    await fetch(`${baseURL}/categories`,{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(category)
    })
    
    
}


export const EditCardyById=async(id,category)=>{;
fetch (`${baseURL}/categories/${id}`,{
    method: 'PUT',
    headers : {
        'Content-Type' : 'application/json'
    },
    body:JSON.stringify(category)
})
    
}