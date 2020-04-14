import http from 'k6/http';

export default function() {
  var houseId = Math.floor(Math.random() * 10000000)
  var url = `http://localhost:3001/api/houses/${houseId}`;
  var payload = JSON.stringify({
    email: 'johndoe@example.com',
    password: 'PASSWORD',
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.get(url);
}