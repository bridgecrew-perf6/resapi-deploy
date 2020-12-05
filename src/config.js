import {config} from 'dotenv'
config()

export default {
   mongodburl:process.env.MONGO_URI || 'mongodb://localhost/apidb'
}