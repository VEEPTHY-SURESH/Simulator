import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Grid.css";
import "./style.css";

function AllScenarios(){
    const [list,setList] = useState([]);
    const [check,setCheck] = useState(false);
    const [scen,setScen] = useState({});
    const [edit,setEdit] = useState(false);
    const [name,setName] = useState('');
    const [time,setTime] = useState('');
    const [add,setAdd] = useState(false);
    const [sname,setSName] = useState('');
    const [vname,setVName] = useState('');
    const [speed,setSpeed] = useState('');
    const [x,setX] = useState('');
    const [lx,setLX] = useState(false);
    const [y,setY] = useState('');
    const [ly,setLY] = useState(false);
    const [direction,setDirection] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:5000/api/s')
        .then(res=>{
            if(res.data){
                setList(res.data);
                setCheck(false);
            }else setCheck(true);
        });
    },[]);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/s/${id}`);
          const res = await axios.get('http://localhost:5000/api/s');
          setList(res.data);
        } catch (error) {
          console.error('Error deleting vehicle or fetching updated list:', error);
        }
      };

      const handleEdit =async(scenario)=>{
        setScen(scenario);
        setName(scenario.name);
        setTime(scenario.time);
        setEdit(true);
      }

      const handleSubmit =()=>{
        if(!name || !time) return;

        axios.post('http://localhost:5000/api/updates',{id:scen._id,name:name,time:time});
        axios.get('http://localhost:5000/api/s')
        .then(res=>{
            if(res.data){
                setList(res.data);
                setCheck(false);
            }else setCheck(true);
        });
        setName('');
        setTime('');
    }

    const handleClose=()=>{
        setEdit(false);
    }

    const handleAdd=(name)=>{
        if(!name) return;
        setAdd(true);
        setSName(name);
    }
    const handleCloseNew=()=>{
        setAdd(false);
        setSName('');
        setVName('');
        setSpeed('');
        setX('');
        setY('');
        setDirection('');
    }

   const handleNewVehicle =()=>{
    if(!sname || !vname || !speed || !x || !y || !direction) return;
    if(x>1000){
        setLX(true);
        return;
    }
    if(y>600){
        setLY(true);
        return;
    }
    axios.post('http://localhost:5000/api/v',{sname,vname,speed,x,y,direction});
        setSName('');
        setVName('');
        setSpeed('');
        setX('');
        setY('');
        setDirection('');
   }

    return(
        <div className="data" style={{display:'flex'}}>
        
            <div className="sidebar" style={{width:'20%'}}>
                <Link className="link" to="/" style={{textDecoration:"none",color:"black"}} ><b>Home</b></Link><br />
                <Link className="link" to="/addscenario" style={{textDecoration:"none",color:"black"}} ><b>Add Scenario</b></Link><br />
                <Link className="link" to="/addvehicle" style={{textDecoration:"none",color:"black"}} ><b>Add Vehicle</b></Link><br />
                <Link className="link" to="/allscenarios" style={{textDecoration:"none",color:"black",backgroundColor:'rgb(180, 177, 177)'}} ><b>All Scenarios</b></Link>
            </div>
        
        <div className="alls" style={{width:'80%',display: check? 'none':'block'}}>
            <b>All Scenarios</b> 
            <div style={{display:edit ? 'block':'none'}}>
                <div className="form" >
                    <div className="form-div" style={{display:'flex'}}>
                        <div>
                            <p><b>Scenario Name</b></p>
                            <input type="text" name="scenarioName" id="scenarioName" placeholder="Scenario Name" value={name} onChange={(e) => setName(e.target.value)} required="required" />
                        </div>
                        <div>
                            <p><b>Scenario Time (second)</b></p>
                            <input type="text" name="scenarioTime" id="scenarioTime" placeholder="Scenario Time" value={time} onChange={(e) => setTime(e.target.value)} required="required" />
                        </div>
                    </div>
                </div>
                <div>
                    <button className="add" onClick={handleSubmit}>Add</button>
                    <button className="reset">Reset</button>
                    <button className="goback">Go Back</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
            <div style={{display: add ? 'block':'none'}}>
                <div className="form" style={{display:'flex'}}>
                        <div>
                            <p><b>Scenario List</b></p>
                            <input type="text" 
                                name="scenarioName" 
                                id="scenarioName" 
                                placeholder="Test Scenario" 
                                value={sname} 
                                onChange={(e)=>{setSName(e.target.value)}} 
                                required="required" />
                        </div>
                        <div>
                            <p><b>Vehicle Name</b></p>
                            <input type="text" 
                                name="vehicleName" 
                                id="vehicleName" 
                                placeholder="Vehicle Name" 
                                value={vname} 
                                onChange={(e)=>{setVName(e.target.value)}}
                                required="required" />
                        </div>
                        <div>
                            <p><b>Speed</b></p>
                            <input type="text" 
                                name="speed" 
                                id="speed" 
                                placeholder="speed" 
                                value={speed} 
                                onChange={(e)=>{setSpeed(e.target.value)}}
                                required="required" />
                        </div>
                        
                    </div>
                    <div className="form" style={{display:'flex'}}>
                        <div>
                            <p><b>Position X</b></p>
                            <input type="text" 
                                name="x position" 
                                id="x position" 
                                placeholder="x positon" 
                                value={x} 
                                onChange={(e)=>{setX(e.target.value)}}
                                required="required" />
                            <p style={{display: lx ?  'block' : 'none',color:'red',fontSize:'10px' }}>X position value must less than 1000</p>
                        </div>
                        <div>
                            <p><b>Position Y</b></p>
                            <input type="text" 
                                name="y" 
                                id="y" 
                                placeholder="y posiion" 
                                value={y} 
                                onChange={(e)=>{setY(e.target.value)}}
                                required="required" />
                            <p style={{display: ly ?  'block' : 'none',color:'red',fontSize:'10px' }}>Y position value must less than 600</p>
                        </div>
                        <div>
                            <p><b>Direction</b></p>
                            <select
                                name="vehicleDirection"
                                value={direction}
                                onChange={(e)=>{
                                    setDirection(e.target.value)
                                }}
                                placeholder='Select a valid vehicle direction'
                                >
                                <option value="none">Select Direction</option>
                                <option value="towards">Towards</option>
                                <option value="backwards">Backwards</option>
                                <option value="upwards">Upwards</option>
                                <option value="downwards">Downwards</option>
                            </select>
                        </div>
                    </div>
                    <button className="add" onClick={handleNewVehicle}>Add</button>
                    <button onClick={handleCloseNew}>close</button>
            </div>
            <div className="buttons">
                <button className="add">New Scenario</button>
                <button className="goback">Add Vehicle</button>
                <button className="reset">Delete All</button>
            </div>
            <div >
                {list &&  <table style={{marginTop:'10px',width:'100%',border:'1px solid black'}}>
                    <thead>
                        <tr style={{fontSize:'14px'}}>
                            <th>Scenario Name</th>
                            <th>Scenario Time</th>
                            <th>Number of Vehicles</th>
                            <th>Add Vehicle</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((scenario,index) => (
                            <tr key={scenario._id} style={{textAlign:'center',fontSize:'15px'}}>
                                <td>{scenario.name}</td>
                                <td>{scenario.time}</td>
                                <td>{scenario.count}</td>
                                <td><i onClick={()=>handleAdd(scenario.name)} className="fa-solid fa-plus" style={{width:'15px',height:'15px',backgroundColor:'black',color:'white',borderRadius:'50%'}}></i></td>
                                <td key={scenario._id}><i onClick={()=>handleEdit(scenario)} className="fa-solid fa-pen"></i></td>
                                <td><i onClick={() => handleDelete(scenario._id)} className="fa-solid fa-trash-can"></i></td>
                            </tr>
                        ))}
                    </tbody>
                        
                    </table>
                }
                    
            </div>
        </div>
    </div>
    )
}

export default AllScenarios;