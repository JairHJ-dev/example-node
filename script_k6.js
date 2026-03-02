import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  ext: {
    loadimpact: {
      projectID: 6873271,
      name: "Prueba UTEQ"
    }
  },
  stages: [
    { target: 10, duration: '20s' },
    { target: 0, duration: '10s' },
  ],
};

export default function () {
  let res1 = http.get('http://localhost:3000/'); 
  check(res1, { 'Home OK': (r) => r.status === 200 });
  sleep(1);
}
