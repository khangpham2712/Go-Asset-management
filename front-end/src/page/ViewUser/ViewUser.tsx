import './ViewUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faCircleUser, faComments, faPlus, faKey, faCircle } from '@fortawesome/free-solid-svg-icons'
import AddUser from '../AddUser/AddUser';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { async } from 'q';
import { doc } from 'prettier';
import { Link } from 'react-router-dom';

type UserDataType = {
    id: number;
    username: string;
    password: number;
    login: number;
    role: number;
    telephone: number;
    dname: string;
  }

const ViewUser = () => {
    const [users, setUsers] = useState<UserDataType[]>([]);
    const [getId, setGetId] = useState(0);

    // EDIT LINK API HERE 
    const url = 'https://assets-management-system.onrender.com/api/auth/register';
    useEffect(() => {
        const fetchUsers = async ()=>{
            const response = await fetch(url);
            const users = (await response.json()) as UserDataType[];
            setUsers(users);
        }
        fetchUsers();
    }, []);
    
    
    const [userUpdate, setUserUpdate] = useState<{username: string, password: number, telephone: number, dname: string}>({username: "", password: 0, telephone: 0, dname: ""});
    const handleClickEdit = (id: any) => {
        document.querySelector('.display-form')?.setAttribute("class", "display-form-show")
        document.querySelector('.body')?.setAttribute("class", "body-opacity")

        // return id sau moi làn click Edit
        setGetId(id)
    }
    
    const handleWhenClickEdit = async () => {  
        if(getId !== 0) {
            // EDIT LINK API HERE 
            const response = await fetch(`https://assets-management-system.onrender.com/api/auth/register/${getId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "username": userUpdate?.username, 
                    "password": userUpdate?.password,
                    "login": users[getId]?.login,
                    "role": users[getId]?.role || 0,
                    "telephone": userUpdate?.telephone,
                    "dname": userUpdate?.dname,
                }),
            });
            if(response.ok){
                window.location.href = "../view-user"
            }
            else{
                const errorValue = await response.json();
                console.error('Failed:', errorValue);
            }
            // console.log(getId)  
        }    
    }

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserUpdate(values => ({...values, [name]: value}))
    }
    
    const handleUpdate = (event: any) => {
        document.querySelector('.display-form-show')?.setAttribute("class", "display-form")
        document.querySelector('.body-opacity')?.setAttribute("class", "body")
        event.preventDefault();
        console.log(userUpdate);
    }

    // const handleClickRemove = () => {
    //     alert('remove');
    // }

    return(
        <div className="view-user">
            <div className="display-form">                

                <div className="form-container">
                    <h1 className="form-title">Edit User</h1>
                    <form action="#">
                        <div className="main-user-info">
                            <div className="user-input-box">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    placeholder="Edit Username" 
                                    value={userUpdate.username || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="user-input-box">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="Edit Password" 
                                    value={userUpdate.password || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="user-input-box">
                                <label htmlFor="telephone">Phone Number</label>
                                <input 
                                    type="text" 
                                    id="telephone" 
                                    name="telephone" 
                                    placeholder="Enter Phone Number" 
                                    value={userUpdate.telephone || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="user-input-box">
                                <label htmlFor="dname">Department</label>
                                <input 
                                    type="text" 
                                    id="dname" 
                                    name="dname" 
                                    placeholder="Edit Department"  
                                    value={userUpdate.dname || ""} 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-submit-btn">
                            <input onClick={() => handleWhenClickEdit()} type="submit" value="Update"/>
                        </div>
                    </form>
                </div>

            </div>

            <div className="heading">
                <h1 className="heading__title">View users list</h1>
                <Link to="/add-user" className="heading__add-user-btn">
                    <FontAwesomeIcon icon={faPlus} />
                    <p className='heading__btn-name'>Add user</p>
                </Link>
                
            </div>
            <div className="body">
                {users.map(user =>(

                    <div className="body__component-user">
                        <div className='body__component-user1'>
                            <div className="body__img-user">
                                <FontAwesomeIcon icon={faCircleUser} />
                            </div>
                            <div className="body__phoneName-user">
                                <p className="name-user">{user.username}</p>
                                <div className='body__phone-user'>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <p className="phone-user">{user.telephone}</p>
                                </div>
                            </div>
                            <div className="body__line"></div>
                            <div className="body__phoneName-user">
                                <div className='body__phone-user-key'>
                                    <FontAwesomeIcon icon={faKey} />
                                    <p className="phone-user-pass">{user.password}</p>
                                </div>
                                <div className='body__phone-user-access'>
                                    <p className="phone-user">Login: {user?.login || 0}</p>
                                    <p className="phone-user">Role: {user.role}</p>
                                </div>
                            </div>
                            <div className="body__line"></div>
                            <div className="body__info-user">
                                <FontAwesomeIcon icon={faComments} />
                                <p className="info-user">{user.dname}</p>
                            </div>
                        </div>
                        <div>
                            {/* <button onClick={() => handleClickRemove()} className='body__view-user-btn'>Remove</button> */}
                            <button onClick={() => handleClickEdit(user.id)} className='body__view-user-btn' id={'body__view-user-btn-' + user.id}>Edit</button>
                        </div>

                    </div>

                ))}

            </div>
        </div>

    );
}

export default ViewUser;