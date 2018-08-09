const serverURL = 'http://localhost:9000';

export const getSensors = () => {//fuction to retrieve sensors from backend
  return fetch(`${serverURL}/sensors`)//fetching this from servers backend
    .then(res => {
      if(res.status !== 200) {
        throw new Error('Error fetching sensors');
      }
      return res.json();//returns javascript object notation
    });
}

export const getSensor = (notes) => {//fuction to retrieve sensors from backend
  return fetch(`${serverURL}/sensor/${notes}`)//fetching this from servers backend
    .then(res => {
      if(res.status !== 200) {
        throw new Error('Error fetching sensor with id: '+notes);
      }
      return res.json();//returns javascript object notation
    });
}