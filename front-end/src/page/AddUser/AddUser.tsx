import './AddUser.css';
// import ViewUser from '../ViewUser/ViewUser';
import { Link } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { check } from 'yargs';
import Checkbox from 'rc-checkbox';
import { checkPropTypes } from 'prop-types';
import axios from "axios";
import { async } from 'q';

const AddUser = () => {

    const [userAdd, setUserAdd] = useState<{
        id: number;
        username: string;
        password: number;
        login: number;
        role: number;
        telephone: number;
        dname: string;
    }[]>([]);

    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newLogin, setNewLogin] = useState(0)
    const [newRole, setNewRole] = useState(0)
    const [newTelephone, setNewTelephone] = useState("")
    const [newDname, setNewDname] = useState("")

    const handleSubmit =  async () => {
        // Make a POST request to your registration API endpoint
      if(newUsername === "" || newPassword === "" || newTelephone === "" || newDname === ""){
        alert("Vui lòng cập nhật đầy đủ thông tin!")
        window.location.href = "../add-user"
        return;
      }
      else if(newUsername !== "" && newPassword !== "" && newTelephone !== "" && newDname !== ""){
        // Edit link API here
        const response = await fetch('http://localhost:3000/courses', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "username": newUsername, 
                "password": newPassword,
                "login": newLogin,
                "role": newRole,
                "telephone": newTelephone,
                "dname": newDname,
            }),
        });
        // if(response.ok){
            // window.location.href = "http://localhost:3001/view-user"
        // }
        // else{
            // const errorValue = await response.json();
            // console.error('Failed:', errorValue);
        // }
      }
    }
    const handleChecked = (data: any) => {
        if(data === 0){
            setNewLogin(1)
        }
        if(data === 1){
            setNewLogin(0)
        }
    }

    return(
        <div className="add-user">
            <section className="container">
                <header>Add an user</header>
                <form action="#" className="form">
                    <div className="input-box">
                        <label>Username</label>
                        <input value={newUsername} onChange={e => setNewUsername(e.target.value)} type="text" placeholder="Please enter username" required />
                    </div>
            
                    <div className="input-box">
                        <label>Password</label>
                        <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="text" placeholder="Please enter password" required />
                    </div>
            
                    <div className="input-box">
                        <label>Telephone</label>
                        <input value={newTelephone} onChange={e => setNewTelephone(e.target.value)} type="text" placeholder="Please enter phone" required />
                    </div>
            
                    <div className='box-login-role'>
                        <div className="gender-box">
                            <h3>Login</h3>
                            <div className="gender-option1">
                                <div className="gender1">
                                {/* <input type="radio" id="check-male" name="gender1" checked={false || true} /> */}
                                <input value={newLogin} onChange={()=>handleChecked(newLogin)} type="checkbox" id="checkLogin" />
                                {/* <label htmlFor="check-male">1</label> */}
                                </div>
                                {/* <div className="gender1">
                                <input type="radio" id="check-female" name="gender1" />
                                <label htmlFor="check-female">0</label>
                                </div> */}
                            </div>
                        </div> 
                        
                        <div className="gender-box">
                            <h3>Role</h3>
                            <div className="gender-option2">
                                <div className="gender2">
                                {/* <input type="radio" id="check-male" name="gender2"  /> */}
                                <input type="checkbox" id="checkRole" />
                                {/* <label htmlFor="check-male">1</label> */}
                                </div>
                                {/* <div className="gender2">
                                <input type="radio" id="check-female" name="gender2" />
                                <label htmlFor="check-female">0</label>
                                </div> */}
                            </div>
                        </div>  
                    </div>                 
            
                    <div className="input-box">
                        <label>Description</label>
                        <input value={newDname} onChange={e => setNewDname(e.target.value)} type="text" placeholder="Please enter description" required />
                    </div>
            

            
                    {/* <div className="input-box">
                        <label>Description</label>
                        <input className="sizetext" type="text" placeholder="Write an asset description" required />
                    </div>
            
                    <div className="input-box address">
                    <label>Address</label>
                    <input type="text" placeholder="Enter street address" required />
                    <input type="text" placeholder="Enter street address line 2" required />
                    <div className="column">
                        <div className="select-box">
                        <select>
                            <option hidden>Country</option>
                            <option>America</option>
                            <option>Japan</option>
                            <option>India</option>
                            <option>Nepal</option>
                        </select>
                        </div>
                        <input type="text" placeholder="Enter your city" required />
                    </div>
                    <div className="column">
                        <input type="text" placeholder="Enter your region" required />
                        <input type="number" placeholder="Enter postal code" required />
                    </div>
                    </div> */}
                    <Link to="/view-user">
                        <button onClick={handleSubmit}>Submit</button>
                    </Link>
                </form>
            </section>
        </div>
    );
}

export default AddUser;