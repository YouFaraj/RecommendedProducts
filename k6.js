import http from 'k6/http';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
      maxVUs: 10000,
    }
  }
};

export default function () {
  http.get(`http://localhost:3003/products/id/${Math.floor(Math.random() * 1000000)}`);
  let data = { id: 1 , title: "testing", brand: "alan" , department: "alan", price: 69.69, imageurl: "/#" , producturl: "/#" }
  var options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post('http://localhost:3003/api/products', JSON.stringify(data), options);
}