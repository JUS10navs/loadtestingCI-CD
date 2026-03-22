import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% requests < 500ms
  },
};

export default function () {
  let res = http.get('http://localhost:5000/api/fast');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}