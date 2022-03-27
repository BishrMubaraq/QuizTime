var db=require('../config/connection')
var collections=require('../config/collections')
const bcrypt=require('bcrypt')
var objectId=require('mongodb').ObjectId

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data)=>{
                userData._id = data.insertedId
                resolve(userData)
            })
        })
        
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        resolve({status:false})
                    }
                })

            }else{
                resolve({status:false})
            }
        })
    },editProfile:(userId,userDet)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collections.USER_COLLECTION).updateOne({_id:objectId(userId)},{
                $set:{
                    Name:userDet.Name
                }
            }).then((response)=>{
                db.get().collection(collections.USER_COLLECTION).findOne({_id:objectId(userId)}).then((user)=>{
                    resolve(user)
                })
                
            })
        })
    },
}