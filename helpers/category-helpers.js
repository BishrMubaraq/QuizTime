var db=require('../config/connection')
var collections=require('../config/collections')


module.exports={
    addCategory:(category)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.CATEGORY_COLLECTIONS).insertOne(category).then((data)=>{
                console.log(data)
                resolve(data)
            })
        })
        
    },
    getAllCategories:()=>{
        return new Promise(async(resolve,reject)=>{
         let categories=await db.get().collection(collections.CATEGORY_COLLECTIONS).find({}).toArray()
         resolve(categories)
        })
    },
}