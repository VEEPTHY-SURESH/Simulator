import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Grid.css";
import "./style.css";

function AddVehicle(){

    const [list,setList] = useState([]);
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
            setList(res.data);
        });
    },[]);

    const handleSubmit=()=>{
        if(!sname || !vname || !speed || !x || !y || !direction) return;
        if(x>1000){
            setLX(true);
            return;
        }else setLX(false);
        if(y>600){
            setLY(true);
            return;
        }else setLY(false);       
        axios.post('http://localhost:5000/api/v',{sname,vname,speed,x,y,direction});
        setSName('');
        setVName('');
        setSpeed('');
        setX('');
        setY('');
        setDirection('');
    }

    const handleReset=()=>{
        setSName('');
        setVName('');
        setSpeed('');
        setX('');
        setY('');
        setDirection('');
    }

    return (
        <div className="data" style={{display:'flex'}}>
            <div className="sidebar" style={{width:'20%'}}>
                <Link className="link" to="/" style={{textDecoration:"none",color:"black"}} ><b>Home</b></Link><br />
                <Link className="link" to="/addscenario" style={{textDecoration:"none",color:"black"}} ><b>Add Scenario</b></Link><br />
                <Link className="link" to="/addvehicle" style={{textDecoration:"none",color:"black",backgroundColor:'rgb(180, 177, 177)'}} ><b>Add Vehicle</b></Link><br />
                <Link className="link" to="/allscenarios" style={{textDecoration:"none",color:"black"}} ><b>All Scenarios</b></Link>
            </div>
            <div className="addv" style={{width:'80%'}}>
                <div>
                    <b>Vehicle/add</b>
                </div>
                <div>
                    <h3>Add Vehicle</h3>
                </div>
                <div className="form" style={{display:'flex'}}>
                    <div>
                        <p><b>Scenario List</b></p>
                        <select
                            name="scenerioList"
                            placeholder="Select Scenerio"
                            value={sname}
                            onChange={(e)=>{setSName(e.target.value)}}
                            >
                            <option value="none">Select Scenerio</option>
                            {list.map((scenerio,index) => (
                                <option key={scenerio._id} value={scenerio.name}>
                                 {scenerio.name}
                                </option>
                            ))}
                        </select>
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
                <div>
                    <button className="add" onClick={handleSubmit}>Add</button>
                    <button className="reset" onClick={handleReset}>Reset</button>
                    <button className="goback">Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default AddVehicle;