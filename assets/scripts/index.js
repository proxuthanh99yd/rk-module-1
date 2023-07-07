import middleware from './app/auth.js'
import request from './app/database.js'
import login from './app/login.js'

login()
request()
window.onload = middleware