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
    return render_template('newpage.html')

@socketio.on('redirection')
def redirect(data):
    first_user = data['name']
    all_players = pd.read_csv('playerlog.csv')['players'].tolist()

    player_position = all_players.index(first_user)

    print(player_position)


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
        storage_df = pd.read_csv('playerlog.csv')

        player_name = [data['name']]
        df_length = len(storage_df)
        storage_df.loc[df_length] = player_name
        storage_df.to_csv('playerlog.csv', index = False)

    else:
        storage_df = pd.DataFrame.from_dict(storage)
        print('Success')
        print(storage_df)
        storage_df.to_csv('playerlog.csv', index = False)
        print(os.listdir())


    print('Players Currently Present:')
    all_players = storage_df['players'].tolist()
    print(all_players)
    player_data = {'data': all_players}

    emit('addpeep', player_data, broadcast = True)


@socketio.on('card_select')
def cardSelection(data, methods = ['GET', 'POST']):
    print(data)
    print('Got your message')

    emit('card_return', data, broadcast = True)


@socketio.on('my event')
def handle_my_custom_event(json, methods = ['GET', 'POST']):
    print('Message my event: {}'.format(json))

    # pass to sql

    emit('my response', json)
    
if __name__ == "__main__":
    socketio.run(app, debug=True)
