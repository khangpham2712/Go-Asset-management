import './ViewUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faCircleUser, faComments, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddUser from '../AddUser/AddUser';

const ViewUser = () => {
    return(
        <div className="view-user">
            <div className="heading">
                <h1 className="heading__title">View users list</h1>
                <button className="heading__add-user-btn">
                    <FontAwesomeIcon icon={faPlus} />
                    <p className='heading__btn-name'>Add user</p>
                </button>
                
            </div>
            <div className="body">
                <div className="body__component-user">
                    <div className="body__name-user">
                        <FontAwesomeIcon icon={faCircleUser} />
                        <p className="name-user">NguyenvanA</p>
                    </div>
                    <div className="body__email-user">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p className="email-user">abc@gmail.com</p>
                    </div>
                    <div className="body__phone-user">
                        <FontAwesomeIcon icon={faPhone} />
                        <p className="phone-user">0908030104</p>
                    </div>
                    <div className="body__info-user">
                        <FontAwesomeIcon icon={faComments} />
                        <p className="info-user">Information technology</p>
                    </div>
                    <button className='body__view-user-btn'>View</button>

                </div>
                <div className="body__component-user">
                    <div className="body__name-user">
                        <FontAwesomeIcon icon={faCircleUser} />
                        <p className="name-user">NguyenvanB</p>
                    </div>
                    <div className="body__email-user">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p className="email-user">abc@gmail.com</p>
                    </div>
                    <div className="body__phone-user">
                        <FontAwesomeIcon icon={faPhone} />
                        <p className="phone-user">0908030104</p>
                    </div>
                    <div className="body__info-user">
                        <FontAwesomeIcon icon={faComments} />
                        <p className="info-user">Information technology</p>
                    </div>
                    <button className='body__view-user-btn'>View</button>
                </div>
                <div className="body__component-user"></div>
                <div className="body__component-user"></div>
                <div className="body__component-user"></div>
                <div className="body__component-user"></div>
                <div className="body__component-user"></div>
            </div>
        </div>

    );
}

export default ViewUser;