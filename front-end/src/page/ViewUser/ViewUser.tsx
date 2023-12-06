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
    
    const url = 'http://localhost:3000/courses';
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
                <form onSubmit={handleUpdate} className='form-update-user' >
                    <h3 className="header-form">Update user</h3>
                    <br />
                    <label className="header-form-label">Username:
                    <input 
                        className="header-form-input"
                        type="text" 
                        name="username" 
                        value={userUpdate.username || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="header-form-label">Password:
                    <input 
                        className="header-form-input"
                        type="text" 
                        name="password" 
                        value={userUpdate.password || 0} 
                        onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="header-form-label">Telephone:
                    <input  
                        className="header-form-input"
                        type="text" 
                        name="telephone" 
                        value={userUpdate.telephone || 0} 
                        onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="header-form-label">Description:
                    <input  
                        className="header-form-input"
                        type="text" 
                        name="dname" 
                        value={userUpdate.dname || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <br />
                    <input className="header-form-submit" type="submit" />
                </form>
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
                                    <p className="phone-user">{user.password}</p>
                                </div>
                                <div className='body__phone-user-access'>
                                    <p className="phone-user">Login: {user.login}</p>
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

                {/* <div className="body__component-user">
                    <div className='body__component-user1'>
                        <div className="body__img-user">
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div className="body__phoneName-user">
                            <p className="name-user">tranvanhoang</p>
                            <div className='body__phone-user'>
                                <FontAwesomeIcon icon={faPhone} />
                                <p className="phone-user">0908030104</p>
                            </div>
                        </div>
                        <div className="body__line"></div>
                        <div className="body__phoneName-user">
                            <div className='body__phone-user-key'>
                                <FontAwesomeIcon icon={faKey} />
                                <p className="phone-user">0908030104</p>
                            </div>
                            <div className='body__phone-user-access'>
                                <p className="phone-user">Login: 1</p>
                                <p className="phone-user">Role: 0</p>
                            </div>
                        </div>
                        <div className="body__line"></div>
                        <div className="body__info-user">
                            <FontAwesomeIcon icon={faComments} />
                            <p className="info-user">Information technology</p>
                        </div>
                    </div>
                    <div>
                        <button className='body__view-user-btn'>Update</button>
                    </div>

                </div> */}

                {/* <div className="body__component-user"></div>
                <div className="body__component-user"></div>
                <div className="body__component-user"></div>
                <div className="body__component-user"></div> */}
            </div>
        </div>

    );
}

export default ViewUser;