import './AddUser.css';

const AddUser = () => {
    return(
        <div className="add-user">
            <section className="container">
                <header>Add an user</header>
                <form action="#" className="form">
                    <div className="input-box">
                        <label>User name*</label>
                        <input type="text" placeholder="Please enter name" required />
                    </div>
            
                    <div className="input-box">
                        <label>User ID*</label>
                        <input type="text" placeholder="Please enter ID" required />
                    </div>
            
                    <div className="input-box">
                        <label>Phone</label>
                        <input type="text" placeholder="Please enter category" required />
                    </div>
            
                    <div className="input-box">
                        <label>Email</label>
                        <input type="text" placeholder="Please enter name" required />
                    </div>
            
                    <div className="input-box">
                        <label>Description</label>
                        <input type="text" placeholder="Please enter cost" required />
                    </div>
            
                    {/* <div className="gender-box">
                    <h3>Status</h3>
                    <div className="gender-option">
                        <div className="gender">
                        <input type="radio" id="check-male" name="gender" checked />
                        <label htmlFor="check-male">Good</label>
                        </div>
                        <div className="gender">
                        <input type="radio" id="check-female" name="gender" />
                        <label htmlFor="check-female">Bad</label>
                        </div>
                        <div className="gender">
                        <input type="radio" id="check-other" name="gender" />
                        <label htmlFor="check-other">Impaired</label>
                        </div>
                        <div className="gender">
                            <input type="radio" id="check-other" name="gender" />
                            <label htmlFor="check-other">Unusable</label>
                        </div>
                        <div className="gender">
                            <input type="radio" id="check-other" name="gender" />
                            <label htmlFor="check-other">None Status</label>
                        </div>
                    </div>
                    </div>
            
                    <div className="input-box">
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
                    <button>Submit</button>
                </form>
            </section>
        </div>
    );
}

export default AddUser;