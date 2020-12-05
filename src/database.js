import mongoose from 'mongoose'
import  config from './config'

(async()=>{
    try {
      await mongoose.connect(config.mongodburl,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
      })
      console.log('db is connected')
    } catch (error) {
      console.error(error)
    }
})()