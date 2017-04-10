import request from './fakeRequest';


const auth = {
  login(username, password, callback) {
    if(!callback) {
      callback = () => {}
    }
    if(this.loggedIn()) {
      callback(true)
      return;
    }
    request.post('/login', {username, password}, (response) => {
      if(response.authenticated) {
        localStorage.token = response.token
        callback(true)
      } else {
        callback(false, response.error)
      }
    })
  },
  logout(callback) {
    request.post('/logout',{}, () => {
      if(callback) {
        callback(true)
      }
    });
  },
  loggedIn() {
    return !!localStorage.token;
  },
  register(username, password, callback) {
    if(!callback) {
      callback = () => {}
    }
    request.post('/register', { username, password}, (response) => {
      if(response.register === true) {
        this.login(username, password, callback)
      } else {
        callback(false, response.error);
      }
    })
  },
  onChange() {}
}


export default auth
