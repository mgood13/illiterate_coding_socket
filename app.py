from flask import Flask, render_template, make_response, redirect, session
from flask_socketio import SocketIO, send, emit
from flask.ext.session import Session
import os


app = Flask(__name__)


SESSION_TYPE = 'redis'
sess = Session(app)
app.config['SECRET_KEY'] = 'ABCDEFG'
app.config['SESSION_COOKIE_NAME'] = "my_session"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
socketio = SocketIO(app)



@app.route('/')
def index():
    print('loading homepage')
    return render_template('index.html')


@app.route('/newpage')
def newpage():
    print(session)
    print(session.get('username'))

    print('{} is moving to another page'.format(session.get("username", "Unknown")))
    return render_template('newpage.html')

@socketio.on('redirection')
def redirect():
    myURL ='/newpage'
    emit('pageRedirect', myURL, broadcast = True)

@socketio.on("message")
def handleMessage(data):
    print(data)

    if 'user' in data:
        print('adding {} to the session'.format(data['user']))
        session['username'] = data['user']
        session.modified = True
        print(session)

    emit("new_message",data,broadcast=True)


def messageReceived(methods = ['GET', 'POST']):
    print('Got your message')


@socketio.on('my event')
def handle_my_custom_event(json, methods = ['GET', 'POST']):
    print('Message my event: {}'.format(json))

    # pass to sql

    emit('my response', json, callback=messageReceived)
    
if __name__ == "__main__":
    socketio.run(app, debug=True)
