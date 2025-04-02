import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors(["http://localhost:5173"]))

app.post('/usuarios', async (req, res) =>{ 
    await prisma.User.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    
    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {
    var users = []
    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{

        const users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) =>{
    await prisma.User.update({
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) =>{
    await prisma.User.delete({
        where:{
            id: req.params.id
        } 
    })
    
    res.status(200).json({message: "Usuario deletado com sucesso!"})
})

app.listen(3000)
// Rotas precisam de - Metodo HTTP
// Precisam de Endereço - ex : www.dsepipkdaps.com
// mongo db = diego Diego_2006