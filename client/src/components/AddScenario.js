import React, {useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./Grid.css";
import "./style.css";

function AddScenario(){

    const [name,setName] = useState('');
    const [time,setTime] = useState('');

    const handleSubmit =()=>{
        if(!name || !time) return;

        axios.post('http://localhost:5000/api/adds',{name:name,time:time});
        setName('');
        setTime('');
    }

    return (
        <div className="data" style={{display:'flex'}}>
            <div className="sidebar" style={{width:'20%'}}>
                <Link className="link" to="/" style={{textDecoration:"none",color:"black"}} ><b>Home</b></Link><br />
                <Link className="link" to="/addscenario" style={{textDecoration:"none",color:"black",backgroundColor:'rgb(180, 177, 177)'}} ><b>Add Scenario</b></Link><br />
                <Link className="link" to="/addvehicle" style={{textDecoration:"none",color:"black"}} ><b>Add Vehicle</b></Link><br />
                <Link className="link" to="/allscenarios" style={{textDecoration:"none",color:"black"}} ><b>All Scenarios</b></Link>
            </div>
            <div className="adds" style={{width:'80%'}}>
                <div>
                    <b>Scenario/add</b>
                </div>
                <div>
                    <h3>Add Scenario</h3>
                </div>
                <div className="form" style={{display:'flex'}}>
                    <div className="form-div">
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
                </div>
            </div>
        </div>
    )
}

export default AddScenario;