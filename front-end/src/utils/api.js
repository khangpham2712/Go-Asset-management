import axios from "axios";

export const deleteData = async () => {
    // const new_data = data.filter(item => item.id !== id);
    // setData(new_data);
    const response =  await axios.delete(
      `http://localhost:8080/api/assets/2`
    );
    // setDeleted(!deleted);

  };