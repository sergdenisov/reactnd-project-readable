const api = 'http://localhost:3001';

let token = localStorage.token;

if (!token) {
  token = Math.random()
    .toString(36)
    .substr(-8);
  localStorage.token = token;
}

const headers = { Authorization: token };

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
