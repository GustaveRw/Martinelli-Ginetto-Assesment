import axios from 'axios';

const authenticate = async (email, password) => {
  const response = await axios.post('/rest/V1/integration/customer/token', {
    username: email,
    password,
  });

  return response.data;
};

export default authenticate;
