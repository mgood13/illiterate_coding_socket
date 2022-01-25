from flask import Flask, render_template, make_response, redirect, session
from flask_socketio import SocketIO, send, emit
import os
import pandas as pd

app = Flask(__name__)
app.secret_key = '12341234'
socketio = SocketIO(app)



@app.route('/')
def index():
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
        print(session)

    emit("new_message",data,broadcast=True)


@socketio.on('addition')
def addpeep(data):
    print('adding someone')
    print(data)

    storage = {'players': [data['name']]}

    files = os.listdir()
    print(files)
    if 'playerlog.csv' in files:
        player_storage = pd.read_csv('playerlog.csv')
        print(player_storage)
        print(player_storage['players'].tolist()[0])



    else:
        storage_df = pd.DataFrame.from_dict(storage)
        print('Success')
        print(storage_df)
        storage_df.to_csv('playerlog.csv')
        print(os.listdir())


    emit('addpeep', data, broadcast = True)



def messageReceived(methods = ['GET', 'POST']):
    print('Got your message')


@socketio.on('my event')
def handle_my_custom_event(json, methods = ['GET', 'POST']):
    print('Message my event: {}'.format(json))

    # pass to sql

    emit('my response', json, callback=messageReceived)
    
if __name__ == "__main__":
    socketio.run(app, debug=True)
