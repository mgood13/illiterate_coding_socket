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
    print('I am here')
    first_user = data['name']
    player_df = pd.read_csv('playerlog.csv')
    all_players = player_df['players'].tolist()

    player_position = all_players.index(first_user)

    turn = []
    for val in range(len(all_players)):
        if val == player_position:
            turn.append(True)
        else:
            turn.append(False)

    player_df['Turn'] = turn
    player_df.to_csv('playerlog.csv', index = False)


    print(player_df)
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

    storage = {'players': [data['name']]}

    files = os.listdir()
    if 'playerlog.csv' in files:
        storage_df = pd.read_csv('playerlog.csv')

        player_name = [data['name']]
        df_length = len(storage_df)
        storage_df.loc[df_length] = player_name
        storage_df.to_csv('playerlog.csv', index = False)

    else:
        storage_df = pd.DataFrame.from_dict(storage)
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

    storage_df = pd.read_csv('playerlog.csv')
    turn = storage_df.loc[storage_df['players'] == data['username'],:]['Turn'].tolist()[0]
    print('Turn: {}'.format(turn))

    if turn:
        print('valid player')
        data['response'] = 'Accepted'

    else:
        print('invalid player')
        data['response'] = 'Denied'


    emit('card_return', data, broadcast = True)

@socketio.on('turn_rotate')
def turn_rotation(data):
    player_df = pd.read_csv('playerlog.csv')
    turn_list = player_df['Turn'].tolist()

    current_index = turn_list.index(True)
    print('Current: {}'.format(current_index))
    num_players = len(turn_list)
    if (current_index == (num_players - 1)):
        new_index = 0
    else:
        new_index = current_index + 1
    new_turn = []
    for i in range(num_players):

        if i == new_index:
            new_turn.append(True)
        else:
            new_turn.append(False)

    print('New: {}'.format(new_index))
    print('New Turn: {}'.format(new_turn))

    player_df['Turn'] = new_turn
    player_df.to_csv('playerlog.csv', index = False)
    emit('change_card',data, broadcast = True)



@socketio.on('my event')
def handle_my_custom_event(json, methods = ['GET', 'POST']):
    print('Message my event: {}'.format(json))

    # pass to sql

    emit('my response', json)
    
if __name__ == "__main__":
    socketio.run(app, debug=True)
