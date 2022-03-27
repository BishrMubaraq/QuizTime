var db=require('../config/connection')
var collections=require('../config/collections')
var objectId=require('mongodb').ObjectId


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
    
    updateCategory:(catId,categoryDet)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collections.CATEGORY_COLLECTIONS).updateOne({_id:objectId(catId)},{
                $set:{
                    CategoryName:categoryDet.CategoryName
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    getCategoryDetails:(catId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collections.CATEGORY_COLLECTIONS).findOne({_id:objectId(catId)}).then((category)=>{
                resolve(category)
            })
        })
    },
    deleteCategoy:(catId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.CATEGORY_COLLECTIONS).deleteOne({_id:objectId(catId)}).then(()=>{
                resolve()
            })
        })
    },
}