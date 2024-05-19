const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://veepthyofficial:r2tn4LmBPS5maMIY@cluster0.91fa7sr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const scenarioSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    time:{
        type: String,
        required:true
    },
    count:{
        type:Number,
        default:0
    }
});

const vehicleSchema = new mongoose.Schema({
    sname: String,
    vname: String,
    speed: String,
    x: String,
    y: String,
    direction: String
})

const Scenario = mongoose.model('Scenario', scenarioSchema);
const Vehicle = mongoose.model('Vehicle',vehicleSchema);

app.use(bodyParser.json());
app.use(cors());

app.get('/api/s',async (req,res)=>{
    const scenarios = await Scenario.find();
    try{
        if(scenarios){
            res.json(scenarios);
        }else return res.status(400).json([]);
    }catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    
});

app.get('/api/v',async (req,res)=>{
    const scenarios = await Vehicle.find();
    try{
        if(scenarios){
            res.json(scenarios);
        }else return res.status(400).json([]);
    }catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    
});

app.get('/api/sv', async (req, res) => {
    const { sname } = req.query;
    // console.log(sname);
  
    try {
      const vehicles = await Vehicle.find({ sname: sname });
  
      if (vehicles.length > 0) {
        res.json(vehicles);
      } else {
        return res.status(400).json([]);
      }
    } catch (error) {
      console.error('Internal Server Error:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });


app.post('/api/v', async (req, res) => {
    const { sname, vname, speed, x, y, direction } = req.body;
    // console.log(name+" "+time);

    if (!sname || !vname || !speed || !x || !y || !direction) {
        return res.status(400).json({ message: 'Name and time are required' });
      }
    
    try {
      const vehicle = new Vehicle({ sname, vname, speed, x, y, direction });
      await vehicle.save();
      res.status(200).json({ message: 'Scenario added successfully' });
    } catch (error) {
      console.error('Internal Server Error:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

  app.post('/api/updates', async (req, res) => {
    const {id, name, time } = req.body;

    if (!id || !name || !time) {
        return res.status(400).json({ message: 'Name and time are required' });
    }

    try {
        let scenario = await Scenario.findOne({_id:id });

        if (!scenario) {
            // If scenario doesn't exist, create a new one
            scenario = new Scenario({ name, time });
            await scenario.save();
            res.status(200).json({ message: 'Scenario added successfully' });
        } else {
            // If scenario exists, increment count and save
            scenario.name=name;
            scenario.time=time;
            await scenario.save();
            res.status(200).json({ message: 'Scenario already exists. Incremented count.' });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

  app.post('/api/adds', async (req, res) => {
    const { name, time } = req.body;

    if (!name || !time) {
        return res.status(400).json({ message: 'Name and time are required' });
    }

    try {
        let scenario = await Scenario.findOne({ name: name, time: time });

        if (!scenario) {
            // If scenario doesn't exist, create a new one
            scenario = new Scenario({ name, time,count:1});
            await scenario.save();
            res.status(200).json({ message: 'Scenario added successfully' });
        } else {
            // If scenario exists, increment count and save
            scenario.count++;
            await scenario.save();
            res.status(200).json({ message: 'Scenario already exists. Incremented count.' });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.delete('/api/sv/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (vehicle) {
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } else {
      res.status(400).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.delete('/api/s/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const scenario = await Scenario.findByIdAndDelete(id);
    if (scenario) {
      res.status(200).json({ message: 'Scenario deleted successfully' });
    } else {
      res.status(400).json({ message: 'Scenario not found' });
    }
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
app.delete('/api/s', async (req, res) => {
  try {
    const result = await Scenario.deleteMany({});
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'All Scenarios deleted successfully' });
    } else {
      res.status(400).json({ message: 'No scenarios found to delete' });
    }
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
