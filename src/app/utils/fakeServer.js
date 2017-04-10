/*import bcrypt from 'bcrypt'*/

let users;

// webpack doesn't like localStorage otherwise
let localStorage = global.window.localStorage

/**
* Fake remote server, using bcrpyt and localstorage to presist data across page reloads
*/

const server = {
  init() {
    if (localStorage.users === undefined || !localStorage.encrypted) {
      const admin = 'admin'
      const password = 'admin' /*bcrypt.hashSync('admin',bcrypt.genSaltSync())*/
      users = {
        [admin]: password
      }
      localStorage.users = JSON.stringify(users);
      localStorage.encrypted = false;
    } else {
      users = JSON.parse(localStorage.users)
    }
  },


  login(username, password, callback) {
    const userExists = this.doesUserExists(username);

    /*if(userExists && bcrypt.compareSync(password, users[username])) {*/
    if(userExists && (password === users[username])) {
      if (callback) callback({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      let error = {}
      if (userExists) {
        error = {
          type: 'password-wrong'
        }
      } else {
        error = {
          type: 'user-doesnt-exist'
        }
      }
      if (callback) callback({
        authenticated: false,
        error: error
      })
    }
  },

  register(username, password, callback) {
    if (!this.doesUserExists(username)) {
      users[username] = password /*bcrpyt.hashSync(password, bcrpyt.genSaltSync())*/
      localStorage.users = JSON.stringify(users);
      if (callback) callback({
        register: true
      })
    } else {
      if (callback) callback({
        register: false,
        error: {
          type: 'username-exists'
        }
      })
    }
  },

  logout(callback) {
    localStorage.removeItem('token');
    if (callback) callback();
  },

  doesUserExists(username) {
    return !(users[username] === undefined);
  }
}

server.init();

export default server
