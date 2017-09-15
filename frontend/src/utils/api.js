import uuidv4 from 'uuid/v4';

const api = 'http://localhost:3001';

let token = localStorage.token;

if (!token) {
  token = Math.random()
    .toString(36)
    .substr(-8);
  localStorage.token = uuidv4();
}

const headers = {
  Authorization: token,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts);

export const postPost = postData =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(postData),
  })
    .then(res => res.json())
    .then(post => post);
