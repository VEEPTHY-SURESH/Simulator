import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
// import GridLines from "./GridLines";
import axios from "axios";
import "./Grid.css";
import "./style.css";

function AllVehicles(){
    const [list,setList] = useState([]);
    const [copy,setCopy] = useState([]);
    const [scenarios,setSchenarios] = useState([]);
    const [sname,setSName] = useState('');
    const [start,setStart] = useState(false);
    const [edit,setEdit] = useState(false);
    const [vname,setVName] = useState('');
    const [speed,setSpeed] = useState('');
    const [x,setX] = useState('');
    const [y,setY] = useState('');
    const [direction,setDirection] = useState('');
    const [display,setDisplay] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/s')
        .then(res=>{   
            setSchenarios(res.data);  
        });
    },[]);

    const handleChange = async (e) => {
        const selectedName = e.target.value;
        setSName(selectedName);
    
        if (selectedName !== 'none') {
        //   console.log(selectedName);
    
          try {
            const res = await axios.get('http://localhost:5000/api/sv', {
              params: { sname: selectedName }
            });
            
                setList(res.data);
                setCopy(res.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else {
          setList([]);
          setCopy([]);
          setSName('');
        }
      };
      const handleStart = () => {
        setStart(true);
        copy.forEach((vehicle, index) => {
          simulateMovement(vehicle, index);
        });
      }
      
      const handleStop = () => {
        setStart(false);
      }
      
      // Function to simulate movement for each vehicle
      const simulateMovement = (vehicle, index) => {
        const { speed, direction } = vehicle;
      
        let time = 0;
      
        scenarios.forEach((scenario) => {
          if (scenario.name === vehicle.sname) {
            time = scenario.time;
          }
        });
        let distance = speed * time;
        console.log(distance);
        let newX = vehicle.x;
        let newY = vehicle.y;
      
        switch (direction) {
          case 'Towards':
            newX += distance;
            if(newX>1000){
                setDisplay(display=>[...display,index]);
                return;
            }
            setCopy(prevList => {
              const updatedList = [...prevList];
              updatedList[index] = { ...vehicle, x: newX, y: newY };
              return updatedList;
            });
            break;
          case 'Backwards':
            newX -= distance;
            if(newX<0){
                setDisplay(display=>[...display,index]);
                return;
            }
            setCopy(prevList => {
              const updatedList = [...prevList];
              updatedList[index] = { ...vehicle, x: newX, y: newY };
              return updatedList;
            });
            break;
          case 'Upwards':
            newY -= distance;
            if(newY<0){
                setDisplay(display=>[...display,index]);
                return;
            }
            setCopy(prevList => {
              const updatedList = [...prevList];
              updatedList[index] = { ...vehicle, x: newX, y: newY };
              return updatedList;
            });
            break;
          case 'Downwards':
            newY += distance;
            if(newY>600){
                setDisplay(display=>[...display,index]);
                return;
            }
            setCopy(prevList => {
              const updatedList = [...prevList];
              updatedList[index] = { ...vehicle, x: newX, y: newY };
              return updatedList;
            });
            break;
          default:
            break;
        }
      
        // const step = () => {
        //   if (start && distance > 0) {
        //     newX += deltaX;
        //     newY += deltaY;
        //     distance -= 1;
      
        //     setCopy(prevList => {
        //       const updatedList = [...prevList];
        //       updatedList[index] = { ...vehicle, x: newX, y: newY };
        //       return updatedList;
        //     });
      
        //     requestAnimationFrame(step);
        //   }
        // };
      
        // requestAnimationFrame(step);
      }
       

    // const handleStart=()=>{
    //     setStart(true);
    // }

    // const handleStop=()=>{
    //     setStart(false);
    // }

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/sv/${id}`);
          const res = await axios.get('http://localhost:5000/api/sv', {
            params: { sname: sname }
          });
          setList(res.data);
        } catch (error) {
          console.error('Error deleting vehicle or fetching updated list:', error);
        }
      };

      const handleSubmit=()=>{
        // console.log(sname+" "+vname+" "+speed+" "+x+" "+y+" "+direction);
        axios.post('http://localhost:5000/api/v',{sname,vname,speed,x,y,direction});
        const res = axios.get('http://localhost:5000/api/sv', {
              params: { sname: sname }
            });
            
            setList(res.data);
        setSName('');
        setVName('');
        setSpeed('');
        setX('');
        setY('');
        setDirection('');
    }
      const handleEdit = async(vehicle)=>{
        setEdit(true);
        setVName(vehicle.vname);
        setSpeed(vehicle.speed);
        setX(vehicle.x);
        setY(vehicle.y);
        setDirection(vehicle.direction);
      }

      const handleClose =()=>{
        setEdit(false);
      }
    

    return(
        <div className="data" style={{display:'flex'}}>
            <div className="sidebar" style={{width:'20%'}}>
                <Link className="link" to="/" style={{textDecoration:"none",color:"black",backgroundColor:'rgb(180, 177, 177)'}} ><b>Home</b></Link><br />
                <Link className="link" to="/addscenario" style={{textDecoration:"none",color:"black"}} ><b>Add Scenario</b></Link><br />
                <Link className="link" to="/addvehicle" style={{textDecoration:"none",color:"black"}} ><b>Add Vehicle</b></Link><br />
                <Link className="link" to="/allscenarios" style={{textDecoration:"none",color:"black"}} ><b>All Scenarios</b></Link>
            </div>
        
            <div className="scenario" style={{width:'80%'}}>
            
                <div className="select">
                    <p><b>Scenario</b></p>
                    <select
                        name="scenarioList"
                        placeholder="Select Scenario"
                        value={sname}
                        onChange={handleChange}
                    >
                        <option value="none">Select Scenario</option>
                        {scenarios.map((scenario) => (
                        <option key={scenario._id} value={scenario.name}>
                            {scenario.name}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="addv" style={{display:edit ? 'block':'none'}}>
                    <div className="form" style={{display:'flex'}}>
                        <div>
                            <p><b>Scenario List</b></p>
                            {/* <input type="text" name="scenarioName" id="scenarioName" placeholder="Test Scenario" required="required" /> */}
                            {/* <label>Scenerio List</label> */}
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
                        <button onClick={handleClose}>close</button>
                    </div>
                </div>
                <div>
                {list.length!==0 ? <table style={{width:'90%',margin:'10px auto',border:'1px solid white'}}>
                        <thead>
                            <tr style={{fontSize:'14px'}}>
                                <th>Vehicle Id</th>
                                <th>Vehicle Name</th>
                                <th>Position X</th>
                                <th>Position Y</th>
                                <th>Speed</th>
                                <th>Direction</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {list.map((vehicle,index) => (

                            <tr key={vehicle._id} style={{textAlign:'center',fontSize:'15px'}}>
                                <td>{index+1}</td>
                                <td>{vehicle.vname}</td>
                                <td>{vehicle.x}</td>
                                <td>{vehicle.y}</td>
                                <td>{vehicle.speed}</td>
                                <td>{vehicle.direction}</td>
                                <td><i onClick={()=>handleEdit(vehicle)} className="fa-solid fa-pen"></i></td>
                                <td key={vehicle._id}>
                                    <i onClick={() => handleDelete(vehicle._id)} className="fa-solid fa-trash-can"></i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    : <b></b>
                }  
                </div>
                <div style={{marginLeft:'77%'}}>
                    <button className="start" onClick={handleStart}>start simulation</button>
                    <button className="stop" onClick={handleStop}>stop simulation</button>
                </div>

                <div style={{display:'inline-block'}}>
                <div className="grid-container">

                {copy.map((vehicle, index) => (
                    <p key={vehicle._id} 
                        style={{
                            zIndex: display.includes(index) ?-100:100,
                            display: start ? 'block' : 'none', 
                             
                            marginLeft: `${vehicle.x}px`,
                            marginTop: `${vehicle.y}px`, 
                            color: 'black' }}>
                        {index + 1}
                    </p>
                ))}

                
                {/* {copy.map((vehicle, index) => (
                        scenarios.map((sc, ind) => (
                            sc.name === vehicle.sname ? (
                                
                                    <p
                                    key={vehicle._id} 
                                    style={{ 
                                        display: start ? 'block' : 'none', 
                                        position: 'relative', 
                                        left: `${vehicle.x}px`, 
                                        top: `${vehicle.y}px`, 
                                        color: 'black' 
                                    }}
                                >
                                    {index + 1}
                                </p>
                                
                            )
                            : null
                        
                        ))
                    ))} */}
                    
                </div>

                </div>
            </div>
        </div>
    )
}

export default AllVehicles;