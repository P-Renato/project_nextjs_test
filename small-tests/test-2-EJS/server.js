import express from 'express';
import fs from 'fs/promises';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const PORT = 7000;

app.set("view engine", "ejs")

app.get('/', (req,res) => {
    res.render('index')
}) 

app.get('/search', (req,res)=> {
    const searchItem = req.query.query;
    console.log('User searched for: ', searchItem);

    res.send(`You searched for: ${searchItem}`)
})


app.post('/search', async(req,res)=>{
    const { searchBar } = req.body;

    if(!searchBar || searchBar.trim() === ''){
        return res.status(400).send('Search input is empty!');
    }
    const searchItem = searchBar.trim();

    

    try {
        await fs.writeFile('search.json', JSON.stringify({ searchItem }, null, 2));
        console.log('Search term saved: ', searchItem);
        res.send(`Search term "${searchItem}" saved successfully!`);
        
    } catch(err) {
        console.log('Failed to save search item: ', err);
        res.status(500).send('Internal server error');
    }
});

app.get('/search', async(req,res) =>{
    try {
        const data = await fs.readFile('search.json', 'utf-8');
        const { searchItem } = JSON.parse(data);
    } catch(err){

    }
})

app.post('/search', async (req, res) => {
  const { searchBar: searchItem } = req.body;

  let searches = [];

  try {
    const fileData = await fs.readFile('search.json', 'utf-8');
    searches = JSON.parse(fileData);
  } catch (err) {
    // If file doesn't exist or is empty, start with an empty array
    if (err.code !== 'ENOENT') {
      return res.status(500).send('Failed to read file');
    }
  }

  searches.push({ searchItem, timestamp: new Date() });

  try {
    await fs.writeFile('search.json', JSON.stringify(searches, null, 2));
    res.send('Search saved!');
  } catch (err) {
    res.status(500).send('Failed to save search');
  }
});

app.listen(PORT, ()=> console.log('Server is running on PORT ', PORT))