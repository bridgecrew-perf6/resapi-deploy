import {Router} from 'express'
import Task from '../model/Task'
import {getPaginate} from '../libs/getPaginate'
const router = Router()


router.get('/',async (req,res)=>{
  const {page, size, title}= req.query

  const {limit, offset} = getPaginate(page, size)

  const condition = title 
            ?  { title: 
                   { $regex: new RegExp(title), $options:"i" }
              }
            : {}

  const users = await Task.paginate(condition,{limit, offset})
  res.json(users)
})

router.get('/done',async (req,res)=>{
  const users = await Task.find({done:true})
  res.json(users)
})

router.post('/',async (req,res)=>{
  const {title, description}= req.body
  if(!title) return res.status(400).json('title required')
  const task = new Task({
    title,description
  })
  const data =  await task.save()
  return res.json({message:'tasks saved', data})
})

router.get('/:id',async (req,res)=>{
  try {
    const {id}=req.params
    const task = await Task.findById(id)
    if(!task) return res.json({message:'tasks not found'})
     res.json(task)
  } catch (error) {
     console.log(error)
  }
}) 

router.delete('/:id',async (req,res)=>{
  const {id}=req.params
  const task = await Task.deleteOne({_id:id})
  return res.json({message:'task delete'})
})

router.put('/edit/:id',async (req,res)=>{
  const {id}=req.params
  const {title, done, description}= req.body
  await Task.updateOne({_id:id},{title, description,done})
  return res.json({message:'task update'})

})

export default router