from flask import Flask, render_template, make_response, redirect, session
from flask_socketio import SocketIO, send, emit
import os

app = Flask(__name__)
app.secret_key = '1234'
socketio = SocketIO(app)



@app.route('/')
def index():
    return render_template('index.html')


@app.route('/newpage')
def newpage():
    print('{} is moving to another page'.format(session.username))
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
