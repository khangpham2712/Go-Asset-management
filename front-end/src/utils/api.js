import axios from "axios";

export const deleteData = async () => {
    // const new_data = data.filter(item => item.id !== id);
    // setData(new_data);
    const response =  await axios.delete(
      `https://assets-management-system.onrender.com/api/assets/2`
    );
    // setDeleted(!deleted);

  };