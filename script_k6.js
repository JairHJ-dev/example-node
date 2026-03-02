import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { target: 10, duration: '30s' },
    { target: 10, duration: '1m' },
    { target: 0, duration: '30s' },
  ],
};

export default function () {
  let res1 = http.get('http://localhost:3000/'); 
  check(res1, { 'Home OK': (r) => r.status === 200 });
  sleep(1);
}
