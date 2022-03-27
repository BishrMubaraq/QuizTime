var db=require('../config/connection')
var collections=require('../config/collections')
var objectId=require('mongodb').ObjectId

module.exports ={
    addQuestionToDoc:(questions)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.QUESTION_COLLECTION).insertOne(questions).then((data)=>{
                resolve(data.insertedId)
            })
        })
    },
    getQuesDet:(quesId)=>{
        return new Promise((resolve,reject)=>{
            
     db.get().collection(collections.QUESTION_COLLECTION).findOne({_id:objectId(quesId)}).then((data)=>{
         resolve(data)
     })
        })
    },
    editQuestion:(question)=>{
        let quesId =question.id
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.QUESTION_COLLECTION).updateOne({_id:objectId(quesId)},{
                $set:{
                    Question:question.Question,
                    A:question.A,
                    B:question.B,
                    C:question.C,
                    D:question.D,
                    CorrectAnswer:question.CorrectAnswer,
                    Description:question.Description
                }
            }).then(()=>{
                resolve()
            })
        })
    },
    deleteQuestion:(quesId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.QUESTION_COLLECTION).deleteOne({_id:objectId(quesId)}).then(()=>{
                resolve()
            })
        })
    }
}