import  express from'express'
import indexRouter from './router/index'
import morgan from 'morgan'
import {resolve} from 'path'
import cors from 'cors'

const app = express()

app.set('port', process.env.PORT || 3000)

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

//global variable

//router
app.use(indexRouter)

app.use(express.static(resolve('./dist/public')))

export default app