const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.feivtst.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const menusCollection = client.db('koFi').collection('menus');
        const coffeesCollection = client.db('koFi').collection('cofees');

        app.get('/menus', async (req, res) => {
            const cursor = menusCollection.find({});
            const menus = await cursor.toArray();
            res.send(menus);
        })

        app.get('/coffees', async (req, res) => {
            const cursor = coffeesCollection.find({});
            const coffees = await cursor.toArray();
            res.send(coffees)
        })

        app.get('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const coffee = await coffeesCollection.findOne(query);
            res.send(coffee)
        })
    }
    finally {
        
    }
}
run().catch(console.dir)


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})