import 'dotenv/config';
import express from 'express';


const app = express();


const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let teaData = [];
let nextId = 1;


//ADD a new tea
app.post('/teas',(req,res)=>{

    const {name,price} = req.body;
    const newTea = {
        id: nextId++,
        name,
        price
    
    }
    

    teaData.push(newTea);
    res.status(200).send(newTea);
})


// GET ALL TEAS
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
})



//GET A TEA BY ID
app.get('/teas/:id',(req,res)=>{
    const id = req.params.id;
    const tea = teaData.find((tea)=>tea.id ===  parseInt(id));
    if(tea){
       return res.status(200).send(tea);
    }else{
        return res.status(404).send({message:`Tea with id ${id} not found`});
    }
})


//UPDATE A TEA

app.put('/teas/:id',(req,res)=>{
    const id = req.params.id;
    const tea = teaData.find((tea)=>tea.id ===  parseInt(id));

    if(!tea){
        return res.status(404).send({message:`Tea with id ${id} not found`});
    
    }

    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;

    return res.status(200).send(tea);


})

app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send({message:`Tea with id ${req.params.id} not found`});
    }
    teaData.splice(index,1);
    return res.status(204).send({message:`Tea with id ${req.params.id} deleted`});
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`);
})