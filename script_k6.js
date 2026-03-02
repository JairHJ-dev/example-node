import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { target: 10, duration: '30s' }, // Sube a 10 usuarios
    { target: 10, duration: '1m' },  // Mantiene 10 usuarios
    { target: 0, duration: '30s' },  // Baja a 0
  ],
};

export default function () {

  let res1 = http.get('http://localhost:3000/'); 
  check(res1, { 'Home carga OK': (r) => r.status === 200 });

  sleep(1);


  let res2 = http.get('http://localhost:3000/api/status'); 
  check(res2, { 'API responde OK': (r) => r.status === 200 });

  sleep(1);
}
