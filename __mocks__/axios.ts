// __mocks__/axios.ts
import { AxiosPromise } from 'axios';

const axiosMock = {
  get: jest.fn(() => Promise.resolve({ data: [] })),
  // Add other Axios methods as needed
};

export default axiosMock;
