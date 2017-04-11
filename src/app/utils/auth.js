import request from './fakeRequest';

const noop = () => null
const auth = {
  login(username, password, callback) {
    let innerCallback = callback
    if (!callback) {
      innerCallback = noop
    }
    if (this.loggedIn()) {
      innerCallback(true)
      return;
    }
    request.post('/login', { username, password }, (response) => {
      if (response.authenticated) {
        localStorage.token = response.token
        innerCallback(true)
      } else {
        innerCallback(false, response.error)
      }
    })
  },
  logout(callback) {
    request.post('/logout', {}, () => {
      if (callback) {
        callback(true)
      }
    });
  },
  loggedIn() {
    return !!localStorage.token;
  },
  register(username, password, callback) {
    let innerCallback = callback
    if (!callback) {
      innerCallback = noop
    }
    request.post('/register', { username, password }, (response) => {
      if (response.register === true) {
        this.login(username, password, innerCallback)
      } else {
        innerCallback(false, response.error);
      }
    })
  },
  onChange() {}
}


export default auth
