import psycopg2
import uuid
import json
import os
import configparser
from flask import Flask
from flask import request
from flask_cors import CORS


services = {
    "discord" : ["body", True],
    "twitter" : ["body", True],
    "google" : ["body", True],
    "github" : ["body", True],
    "linkedin" : ["body", True],
    "spotify" : ["body", True],
    "twitch" : ["body", True],
    "weather" : ["query", False],
    "ipfs" : ["body", False],
    "twitch" : ["body", True],
    "coingecko" : ["body", False],
    "riotgame" : ["body", False],
    "salat" : ["body", False],
}
methods_index = 0
params_index = 1

param_var = {
    "discord" : ["messageContent"],
    "twitter" : ["text"],
    "google" : ["language", "message", "text", "event_name", "file_name", "content", "toEmail", "fromEmail"],
    "github" : ["name", "email", "bio", "visibility", "repository", "description"],
    "linkedin" : ["content"],
    "spotify" : ["playlist_url", "volume_percent"],
    "twitch" : ["description"],
    "weather" : ["usr"],
    "ipfs" : ["data"],
    "coingecko" : ["coin", "price", "percentage"],
    "riotgame" : ["champion_name"],
    "salat" : ["messagecontent"],
}

methods = {
    # ! coin gecko routes
    "http://coingecko:9040/coingecko/existingcoin" : ["get", [0]],
    "http://coingecko:9040/coingecko/checkcoinprice" : ["get", [0, 1]],
    "http://coingecko:9040/coingecko/checkchangeonehourpercentage" : ["get", [0,2]],
    "http://coingecko:9040/coingecko/checkchangeonedaypercentage" : ["get", [0,2]],
    "http://coingecko:9040/coingecko/checkchangeweekpercentage" : ["get", [0,2]],
    "http://coingecko:9040/coingecko/btccheckcoinprice" : ["get", [1]],
    "http://coingecko:9040/coingecko/btccheckonehour" : ["get", [2]],
    "http://coingecko:9040/coingecko/btccheckoneday" : ["get", [2]],
    "http://coingecko:9040/coingecko/btccheckoneweek" : ["get", [2]],
    "http://coingecko:9040/coingecko/ethcheckcoinprice" : ["get", [1]],
    "http://coingecko:9040/coingecko/ethcheckonehour" : ["get", [2]],
    "http://coingecko:9040/coingecko/ethcheckoneday" : ["get", [2]],
    "http://coingecko:9040/coingecko/ethcheckoneweek" : ["get", [2]],
    "http://coingecko:9040/coingecko/bnbcheckcoinprice" : ["get", [1]],
    "http://coingecko:9040/coingecko/bnbcheckonehour" : ["get", [2]],
    "http://coingecko:9040/coingecko/bnbcheckoneday" : ["get", [2]],
    "http://coingecko:9040/coingecko/bnbcheckoneweek" : ["get", [2]],
    "http://coingecko:9040/coingecko/binanceusdcheckcoinprice" : ["get", [1]],
    "http://coingecko:9040/coingecko/binanceusdcheckonehour" : ["get", [2]],
    "http://coingecko:9040/coingecko/binanceusdcheckoneday" : ["get", [2]],
    "http://coingecko:9040/coingecko/binanceusdcheckoneweek" : ["get", [2]],
    "http://coingecko:9040/coingecko/solanacheckcoinprice" : ["get", [1]],
    "http://coingecko:9040/coingecko/solanacheckonehour" : ["get", [2]],
    "http://coingecko:9040/coingecko/solanacheckoneday" : ["get", [2]],
    "http://coingecko:9040/coingecko/solanacheckoneweek" : ["get", [2]],
    # ! google routes
    # ! gmail routes
    "http://google:9115/google/gmail/getUserMessages" : ["get", []],
    "http://google:9115/google/gmail/getUserDrafts" : ["get", []],
    "http://google:9115/google/gmail/getUserLanguage" : ["get", []],
    "http://google:9115/google/gmail/updateUserLanguage" : ["post", [0]],
    "http://google:9115/google/gmail/getUserFilters" : ["get", []],
    "http://google:9115/google/gmail/getUserSendAs" : ["get", []],
    "http://google:9115/google/gmail/trashMessage" : ["post", [1]],
    "http://google:9115/google/gmail/sendMail" : ["post", [2, 6]],
    # ! calendar routes
    "http://google:9115/google/calendar/getUserEvents" : ["get", []],
    "http://google:9115/google/calendar/createEvent" : ["post", [2]],
    "http://google:9115/google/calendar/deleteEvent" : ["delete", [3]],
    # ! drive routes
    "http://google:9115/google/drive/listFiles" : ["get", []],
    "http://google:9115/google/drive/createFile" : ["post", [4]],
    "http://google:9115/google/drive/deleteFile" : ["delete", [4]],
    "http://google:9115/google/drive/listComment" : ["get", [4]],
    "http://google:9115/google/drive/createComment" : ["post", [4, 5]],
    "http://google:9115/google/drive/deleteComment" : ["delete", [4, 5]],
    # ! youtube routes
    "http://google:9115/google/youtube/listLikedVideos" : ["get", []],
    "http://google:9115/google/youtube/listDislikedVideos" : ["get", []],
    # ! discord routes
    "http://discord:9010/Discord/message": ["get", [0]],
    "http://discord:9010/Discord/sendrandommeme": ["get", []],
    "http://discord:9010/Discord/sendrandomgif": ["get", []],
    # ! ipfs routes
    "http://ipfs:9030/ipfs/bootstraprmall": ["get", []],
    "http://ipfs:9030/ipfs/filesmkdir": ["post", [0]],
    "http://ipfs:9030/ipfs/pinadd": ["post", [0]],
    "http://ipfs:9030/ipfs/bootstraplist": ["get", []],
    "http://ipfs:9030/ipfs/bootstrapadd": ["post", [0]],
    "http://ipfs:9030/ipfs/bootstrapadddefault": ["get", []],
    "http://ipfs:9030/ipfs/pinrm": ["post", [0]],
    "http://ipfs:9030/ipfs/get": ["post", [0]],
    "http://ipfs:9030/ipfs/swarmconnect": ["post", [0]],
    "http://ipfs:9030/ipfs/swarmdisconnect": ["post", [0]],
    "http://ipfs:9030/ipfs/shutdown": ["get", []],
    # ! spotify routes
    "http://spotify:9125/spotify/userName" : ["get", []],
    "http://spotify:9125/spotify/userMail" : ["get", []],
    "http://spotify:9125/spotify/userFollowers" : ["get", []],
    "http://spotify:9125/spotify/userProfileImage" : ["get", []],
    "http://spotify:9125/spotify/userProduct" : ["get", []],
    "http://spotify:9125/spotify/userFollowing" : ["get", []],
    "http://spotify:9125/spotify/followPlaylist" : ["get", [0]],
    "http://spotify:9125/spotify/pausePlayback" : ["get", []],
    "http://spotify:9125/spotify/resumePlayback" : ["get", []],
    "http://spotify:9125/spotify/skipToNext" : ["get", []],
    "http://spotify:9125/spotify/skipToPrevious" : ["get", []],
    "http://spotify:9125/spotify/setPlaybackVolume" : ["get", [1]],
    # ! twitch routes
    "http://twitch:9135/twitch/userName" : ["get", []],
    "http://twitch:9135/twitch/userDescription" : ["get", []],
    "http://twitch:9135/twitch/userProfileImage" : ["get", []],
    "http://twitch:9135/twitch/userEmail" : ["get", []],
    "http://twitch:9135/twitch/changeDescription" : ["get", [0]],
    "http://twitch:9135/twitch/userFollowers" : ["get", []],
    "http://twitch:9135/twitch/userBlockedUsers" : ["get", []],
    "http://twitch:9135/twitch/userPlaylists" : ["get", []],
    "http://twitch:9135/twitch/userFollowing" : ["get", []],
    "http://twitch:9135/twitch/userVideos" : ["get", []],
    "http://twitch:9135/twitch/raidUser" : ["get", []],
    # ! weather routes
    "http://weather:8095/Weather/toHot": ["get", []],
    "http://weather:8095/Weather/toCold": ["get", []],
    "http://weather:8095/Weather/toWet": ["get", []],
    "http://weather:8095/Weather/toDry": ["get", []],
    "http://weather:8095/Weather/tempusercheckmore": ["get", [0]],
    "http://weather:8095/Weather/tempusercheckless": ["get", [0]],
    "http://weather:8095/Weather/humusercheckmore": ["get", [0]],
    "http://weather:8095/Weather/humusercheckless": ["get", [0]],
    "http://weather:8095/Weather/below10" : ["get", []],
	"http://weather:8095/Weather/below0" : ["get", []],
	"http://weather:8095/Weather/above20" : ["get", []],
	"http://weather:8095/Weather/above30" : ["get", []],
	"http://weather:8095/Weather/verycloudy" : ["get", []],
	"http://weather:8095/Weather/snowing" : ["get", []],
	"http://weather:8095/Weather/raining" : ["get", []],
	"http://weather:8095/Weather/windy" : ["get", []],
    #! github routes
    "http://github:9065/github/userName" : ["get", []],
    "http://github:9065/github/userDescription" : ["get", []],
    "http://github:9065/github/updateUserName" : ["post", [0]],
    "http://github:9065/github/updateUserEmail" : ["post", [1]],
    "http://github:9065/github/updateUserDescription" : ["post", [2]],
    "http://github:9065/github/updateEmailVisibility" : ["post", [3]],
    "http://github:9065/github/userFollowers" : ["get", []],
    "http://github:9065/github/userFollowing" : ["get", []],
    "http://github:9065/github/userRepository" : ["get", []],
    "http://github:9065/github/createRepository" : ["post", [4, 5]],
    "http://github:9065/github/userCommits" : ["get", []],
    "http://github:9065/github/userBranches" : ["get", []],
    #! twitter routes
    "http://twitter:9005/twitter/name" : ["get", []],
    "http://twitter:9005/twitter/username" : ["get", []],
    "http://twitter:9005/twitter/bookmarks" : ["get", []],
    "http://twitter:9005/twitter/messages" : ["get", []],
    "http://twitter:9005/twitter/userTweets" : ["get", []],
    "http://twitter:9005/twitter/following" : ["get", []],
    "http://twitter:9005/twitter/followers" : ["get", []],
    "http://twitter:9005/twitter/likingUsers" : ["get", []],
    "http://twitter:9005/twitter/retweetedBy" : ["get", []],
    "http://twitter:9005/twitter/likedTweets" : ["get", []],
    "http://twitter:9005/twitter/createTweet" : ["post", [0]],
    #! linkedin routes
    "http://linkedin:9075/linkedin/userEmail" : ["get", []],
    "http://linkedin:9075/linkedin/createpost" : ["get", [0]],
    #! riotgame routes
    "http://riotgame:9140/riotgame/maintenance" : ["get", []],
    "http://riotgame:9140/riotgame/ischampioninrotation" : ["get", [0]],
    #! salat routes
    "http://salat:9455/salat/asr" : ["get", []],
    "http://salat:9455/salat/dhuhr" : ["get", []],
    "http://salat:9455/salat/fajr" : ["get", []],
    "http://salat:9455/salat/firstthird" : ["get", []],
    "http://salat:9455/salat/imsak" : ["get", []],
    "http://salat:9455/salat/isha" : ["get", []],
    "http://salat:9455/salat/lastthird" : ["get", []],
    "http://salat:9455/salat/maghrib" : ["get", []],
    "http://salat:9455/salat/midnight" : ["get", []],
    "http://salat:9455/salat/sunrise" : ["get", []],
    "http://salat:9455/salat/sunset" : ["get", []],
}

info_param = 0
info_auth = 1

config = configparser.ConfigParser()
config.read('config.ini')

user        = config['db']['DB_USER']
host        = config['db']['DB_HOST']
db_name     = config['db']['DB_NAME']
db_password = config['db']['DB_PASSWORD']
port        = config['db']['DB_PORT']

app = Flask(__name__)
cors = CORS(app)


def execute_query(query):
    res=""
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    cursor.execute(query)
    try:
        res = cursor.fetchall()
    except:
        pass
    cursor.close()
    conn.close()
    return res

def get_uuid(mail):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    getuuid = "select uuid from login where mail='" + str(mail) + "';";
    cursor.execute(getuuid)
    tmpuuid = cursor.fetchall()
    if (len(tmpuuid) < 1):
        return None
    uuid = tmpuuid[0][0]
    cursor.close()
    conn.close()
    return uuid

#! LOGIN TABLE

def get_login_state(mail):
    uuid = get_uuid(mail)
    query = "select logged_in from login where uuid='"+uuid+"';"
    res = execute_query(query)
    return res

def is_a_user_logged_in():
    query = "select mail, logged_in from login;"
    res = execute_query(query)
    for temp in res:
        if temp[1] == True:
            return (True, temp[0])
    return (False, "")

def get_login_table():
    query = "SELECT * FROM login;"
    res = execute_query(query)
    return res

def get_login_user_by_email(mail):
    query = "SELECT * FROM login WHERE login.mail='"+mail+"\';"
    res = execute_query(query)
    return res

def exists(mail):
    query = "SELECT * FROM login WHERE mail='"+mail+"\'"
    res = execute_query(query)
    print(res)
    if len(res) != 0:
        return True;
    return False;

def init_credentials(uuid):
    for service in services:
        if services[service][info_auth] == True:
            query = "INSERT INTO credentials (uuid, service, is_logged) VALUES ('" + uuid + "', '" + service + "', false);"
            execute_query(query)
        else:
            continue

def new_login(mail, password):
    if exists(mail) == True:
        return False
    tmpuser_id = uuid.uuid4().int & (1<<64)-1
    query = "INSERT INTO login (uuid, mail, password, logged_in) VALUES ('" + str(tmpuser_id) + "', '" + mail + "', '" + password + "', " + str(True) + ");"
    execute_query(query)
    init_credentials(str(tmpuser_id))
    return True

def delete_login_by_email(mail):
    if exists(mail) == False:
        return False
    query = "DELETE FROM login WHERE mail='" + mail + "';"
    execute_query(query)
    return True

def change_logged_in(mail, state):
    uuid = get_uuid(mail)
    if uuid == None:
        return False
    query="update login set logged_in=" + str(state) + " where uuid='" + uuid +"';"
    execute_query(query)
    return True

def checkislogged(mail):
    uuid = get_uuid(mail)
    if uuid == None:
        return 0
    query = "select logged_in from login where uuid ='" + uuid + "';"
    res = execute_query(query)
    state = bool(res[0][0])
    if state == True:
        return 1
    else:
        return 2

def disconect(mail):
    uuid = get_uuid(mail)
    if uuid == None:
        return False
    query = "update login set logged_in=false where uuid='"+uuid+"';";
    res = execute_query(query)
    return True

def register_with_credentials(mail, service, access_token):
    if exists(mail) == True:
        return False
    tmpuser_id = uuid.uuid4().int & (1<<64)-1
    query = "INSERT INTO login (uuid, mail, password, logged_in) VALUES ('" + str(tmpuser_id) + "', '" + mail + "', ' ', " + str(True) + ");"
    res1 = execute_query(query)
    init_credentials(str(tmpuser_id))
    scdquery = "update credentials set is_logged=true, access_token='"+access_token+"' where uuid='"+str(tmpuser_id)+"' and service='"+service+"';"
    res2 = execute_query(scdquery)
    return True

def login_with_credentials(mail, access_token, service):
    uuid = get_uuid(mail)
    if uuid == None:
        return False
    fstquery = "update login set logged_in=true where uuid='"+uuid+"' and password=' ';"
    res1 = execute_query(fstquery)
    scdquery="update credentials set access_token='"+access_token+"' where uuid='"+uuid+"' and service='"+service+"';"
    res2 = execute_query(scdquery)
    return True

def registered_with_credential(mail):
    uuid = get_uuid(mail)
    if uuid == None:
        return 0
    query = "select password from login where uuid='" + uuid + "';"
    res = execute_query(query)
    if (res[0][0] == ' '):
        return 1
    return 2

#! CREDENTIALS TABLE

def set_access_token(mail, service, access_token):
    uuid = get_uuid(mail)
    if uuid == None:
        return 0
    fstquery = "SELECT service FROM credentials WHERE uuid='" +uuid+ "' and service='" + service + "';"
    res1 = execute_query(fstquery)
    if (len(res1) < 1 or len(res1[0]) < 1 or len(res1[0][0]) < 1):
        return 1
    scdquery = "update credentials set is_logged=true, access_token='" + access_token + "' where uuid='" + uuid + "' and service='" + service + "';"
    res2 = execute_query(scdquery)
    return 2

def set_refresh_token(mail, service, refresh_token):
    uuid = get_uuid(mail)
    if uuid == None:
        return 0
    fstquery = "SELECT service FROM credentials WHERE uuid='" + uuid + "' and service='" + service + "';"
    res1 = execute_query(fstquery)
    if (len(res1) < 1 or len(res1[0]) < 1 or len(res1[0][0]) < 1):
        return 1
    scdquery = "update credentials set is_logged=true, refresh_token='" + refresh_token + "' where uuid='" + uuid + "' and service='" + service + "';"
    res2 = execute_query(scdquery)
    return 2

def set_access_and_refresh_token(mail, service, access_token, refresh_token):
    uuid = get_uuid(mail)
    if uuid == None:
        return 0
    fstquery = "SELECT service FROM credentials WHERE uuid='" + uuid + "' and service='" + service + "';"
    res1 = execute_query(fstquery)
    if (len(res1) < 1 or len(res1[0]) < 1 or len(res1[0][0]) < 1):
        return 1
    scdquery = "update credentials set is_logged=true, access_token='" + access_token + "',refresh_token='" + refresh_token + "' where uuid='" + uuid + "' and service='" + service + "';"
    res2 = execute_query(scdquery)
    return 2

def get_credentials_table():
    query = "SELECT * FROM credentials;"
    res = execute_query(query)
    return res

def new_credentials(mail, service, is_logged, access_token, refresh_token):
    query = "INSERT INTO credentials (uuid, service, is_logged, access_token, refresh_token) VALUES ("+ "(select uuid from login where mail='" + mail + "'), '"+ service + "' , " + is_logged + ", '"+ access_token + "', '" + refresh_token + "');"
    res = execute_query(query)

def get_credentials_from_mail(mail):
    query = "select * from credentials a join login b on a.uuid = b.uuid where b.mail='" + mail + "';"
    res = execute_query(query)
    return res

def delete_credentials_by_email(mail, service):
    uuid = get_uuid(mail)
    if uuid == None:
        return False
    fstquery = "DELETE FROM credentials WHERE uuid='" + str(uuid) + "' AND service='" + str(service) + "';"
    res1 = execute_query(fstquery)
    return True

def check_service_logged_in(mail, service):
    uuid = get_uuid(mail)
    if uuid == None:
        return 0
    query = "select is_logged from credentials where uuid='" + uuid + "' and service='" + str(service) + "';"
    res = execute_query(query)
    if (len(res) < 1 or len(res[0]) < 1):
        return 0
    is_logged = res[0][0]
    if is_logged == True:
        return 1
    return 2

def disconect_service(mail, service):
    uuid = get_uuid(mail)
    if uuid == None:
        return False
    query = "update credentials set is_logged=false, access_token=null where uuid='"+uuid+"';"
    res = execute_query(query)
    return True

#! AREA TABLE

def parse_param(parameter):
    param_list = parameter.split(',')
    param_data = dict()
    for param in param_list:
        temp = param.split(':')
        param_data[temp[0]] = temp[1]
    return param_data

def set_methods(route):
    tmp="methods:"
    if route in methods:
        tmp+=methods[route][methods_index]
    else:
        tmp+="notfound"
    return tmp

def set_headers(route):
    res = ""
    temp = route.split('/')

    for tmp in temp:
        if tmp.lower() in services:
            if services[tmp.lower()][info_auth] == True:
                res =",access_token:headers"
            else:
                pass
    return res

def set_params(route):
    res = ""
    temp = route.split('/')
    service = ""

    for tmp in temp:
        if tmp.lower() in services:
            service = tmp.lower()

    if len(service) == 0:
        return ",notfound:notfound"

    if route in methods:
        temp = methods[route][params_index]
        if len(temp) == 1:
            res+=","+param_var[service][temp[0]]+":"+services[service][info_param]
        elif len(temp) > 1:
            for tmp in temp:
                res+=","+param_var[service][tmp]+":"+services[service][info_param]
        elif len(temp) == 0:
            pass
    else:
        res =",notfound:notfound"
    return res

def set_datas(data_params, datas):
    temp=parse_param(data_params)
    temp_datas=datas.split(',')
    datas_index=0
    res=""
    first=True

    for tmp in temp:
        if tmp == "methods" or tmp == "access_token":
            continue
        else:
            if first == True:
                res=tmp+":"+temp_datas[datas_index]
                first=False
                datas_index+=1
            else:
                res+=","+tmp+":"+temp_datas[datas_index]
                datas_index+=1
    if first == True:
        res="empty:empty"
    return res


def query_params(action ,reaction, action_data, reaction_data):

    action_param_str = set_methods(action)
    reaction_param_str = set_methods(reaction)

    action_param_str += set_headers(action)
    reaction_param_str += set_headers(reaction)

    action_param_str += set_params(action)
    reaction_param_str += set_params(reaction)

    action_data_str = set_datas(action_param_str, action_data)
    reaction_data_str = set_datas(reaction_param_str, reaction_data)

    return(action_param_str, reaction_param_str, action_data_str, reaction_data_str)

def new_area(mail, action, action_done, reaction, reaction_done, action_params, reaction_params, action_data, reaction_data):
    uuid = get_uuid(mail)
    if uuid == None:
        return False
    temp = query_params(action, reaction, action_data, reaction_data)
    query = "insert into areas (uuid, action, action_done, reaction, reaction_done, action_params, reaction_params, action_data, reaction_data) values ('" + uuid + "', '" + str(action) + "', "+ str(action_done) + ", '" + str(reaction) + "', " + str(reaction_done) + ", '" + str(temp[0]) + "', '" + str(temp[1]) +"', '" + str(temp[2]) + "', '" + str(temp[3]) + "');"
    res = execute_query(query)
    return True

def get_area_from_mail(mail):
    uuid = get_uuid(mail)
    if uuid == None:
        return {"notfound":"notfound"};
    query = "select action, action_done, reaction, reaction_done from areas where uuid ='" + uuid + "';"
    res = execute_query(query)
    return res

def delete_area(mail, action ,reaction):
    uuid = get_uuid(mail)
    if uuid == None:
        return 0
    fstquery = "select * from areas where uuid='" + uuid + "' and action='" + action + "' and reaction='" + reaction + "';"
    res1 = execute_query(fstquery)
    if (len(res1) == 0):
        return 1
    scdquery="delete from areas where uuid='" + uuid + "' and action='" + action + "' and reaction='" + reaction + "';"
    res2 = execute_query(scdquery)
    return 2

def delete_all_areas(mail):
    uuid = get_uuid(mail)
    if uuid == None:
        return False
    query="delete from areas where uuid='" + uuid + "';"
    res = execute_query(query)
    return True

#! LOGIN ROUTES

@app.route('/db/ping', methods=['GET'])
def ping():
    return "Ok", 200

@app.route('/db/ManipulateLogin/newlogin', methods=['POST'])
def newlogin():
    request_data = request.json
    try :
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try :
        password = request_data['password']
    except:
        return "Bad info given, need password", 400
    if (new_login(mail, password) == False):
        return "User already exists", 405
    return "User added successfully", 201

@app.route('/db/ManipulateLogin/switchedLogin', methods=['POST'])
def switchedLogin():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        state = request_data['state']
    except:
        return "Bad info given, need state", 400
    if change_logged_in(mail, state) == True:
        return "State changed successfully", 200
    else:
        return "User does not exist", 404

@app.route('/db/ManipulateLogin/islogged', methods=['GET'])
def islogged():
    mail = request.args.get('mail')
    if mail == None:
        return "No mail given", 400
    retval = checkislogged(mail);
    if  retval == 0:
        return "User does not exist", 404
    elif retval == 1:
        return "User is logged in", 200
    else:
        return "User is not logged in", 400

@app.route('/db/ManipulateLogin/checkuserexist', methods=['GET'])
def checkuserexist():
    mail = request.args.get('mail')
    if mail == None:
        return "No mail given", 400
    if exists(mail) == True:
        return "User exist", 200
    return "User does not exist", 404

@app.route('/db/ManipulateLogin/getuserbyemail', methods=['GET'])
def getuserbyemail():
    mail = request.args.get('mail')
    if mail == None:
        return "No mail given", 400
    if exists(mail) == False:
        return "User does not exists", 404
    tmp = get_login_user_by_email(mail)
    if len(tmp) == 0 or tmp[0] == None:
        return "User does not exist", 404
    temp = "user_id: " + tmp[0][0] + " mail: " + tmp[0][1] + " password: " + tmp[0][2]
    return temp, 200

@app.route('/db/ManipulateLogin/getloginstate', methods=['GET'])
def getloginstate():
    mail = request.args.get('mail')
    if mail == None:
        return "No mail given", 400
    if exists(mail) == False:
        return "User does not exists", 404
    else:
        res = get_login_state(mail)
        if res[0][0] == True:
            return "Logged in", 200
        else:
            return "Not Logged in", 400

@app.route('/db/ManipulateLogin/isausersloggedin', methods=['GET'])
def isausersloggedin():
    temp = is_a_user_logged_in()
    print(temp)
    if temp[0] == False:
        return "Not user logged in", 404
    else:
        return temp[1], 200

@app.route('/db/ManipulateLogin/checkaccess', methods=['GET'])
def checkaccess():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        password = request_data['password']
    except:
        return "Bad info given, need password", 400
    if exists(mail) == False:
        return "User does not exists", 404
    tmp = get_login_user_by_email(mail)
    if len(tmp) == 0 or tmp[0] == None:
        return "User does not exist", 404
    getpassword = str(tmp[0][2])
    if (getpassword != password):
        return "Incorect password", 400
    if (getpassword == password):
        change_logged_in(mail, True)
        return "Correct access", 200

@app.route('/db/ManipulateLogin/deletebymail', methods=['DELETE'])
def deleteloginbymail():
    mail = request.args.get('mail')
    if mail == None:
        return "No mail given", 400
    if delete_login_by_email(mail) == False:
        return "User does not exist", 404
    delete_login_by_email(mail)
    return "User deleted successfully", 205

@app.route('/db/ManipulateLogin/gettable', methods=['GET'])
def gettable():
    res = get_login_table()
    return json.dumps(res), 200

@app.route('/db/ManipulateLogin/registeredwithcredential', methods=['GET'])
def registeredwithcredential():
    mail = request.args.get('mail')
    if mail == None:
        return "No mail given", 400
    res = registered_with_credential(mail)
    if res == 0:
        return "User not found", 404
    if res == 1:
        return "Registered with credentials", 200
    else:
        return "Not registered with credentials", 400

@app.route('/db/ManipulateLogin/registerwithcredentials', methods=['POST'])
def registerwithcredentials():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        service = request_data['service']
    except:
        return "Bad info given, need service", 400
    try:
        access_token = request_data['access_token']
    except:
        return "Bad info given, need access_token", 400
    if register_with_credentials(mail ,service, access_token) == False:
        return "User already exist", 405
    else:
        return "User added successfully", 201

@app.route('/db/ManipulateLogin/loginwithcredentials', methods=['POST'])
def loginwithcredentials():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        service = request_data['service']
    except:
        return "Bad info given, need service", 400
    try:
        access_token = request_data['access_token']
    except:
        return "Bad info given, need access_token", 400
    res = login_with_credentials(mail, access_token, service)
    if res == False:
        return "User does not exist", 404
    else:
        return "Login successfully", 200

@app.route('/db/ManipulateLogin/disconectuser', methods=['GET'])
def disconectuser():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    if disconect(mail) == False:
        return "User not found", 404
    else:
        return "User disconected", 200

#! CREDENTIALS ROUTES

@app.route('/db/ManipulateCredentials/newcredentials', methods=['POST'])
def newcredentials():
    request_data = request.json
    access_token=""
    refresh_token=""
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        service = request_data['service']
    except:
        return "Bad info given, need service", 400
    try:
        is_logged = request_data['is_logged']
    except:
        return "Bad info given, need is_logged", 400
    try:
        access_token = request_data['access_token']
        refresh_token = request_data['refresh_token']
    except:
        pass
    new_credentials(mail, service, is_logged, access_token, refresh_token)
    return "Credential added successfully", 201

@app.route('/db/ManipulateCredentials/getcredentialsfrommail', methods=['GET'])
def getcredentialsfrommail():
    #request_data = request.json
    mail = request.args.get('mail')
    if mail == None:
        return "No mail given", 400
    res = get_credentials_from_mail(mail)
    jsontmp = json.dumps(res)
    return jsontmp, 200

@app.route('/db/ManipulateCredentials/getcredtable', methods=['GET'])
def getcredentialstable():
    res = get_credentials_table()
    return json.dumps(res), 200

@app.route('/db/ManipulateCredentials/deletecredbymail', methods=['DELETE'])
def deletebymail():
    mail = request.args.get('mail')
    service = request.args.get('service')
    if mail == None:
        return "No mail given", 400
    if service == None:
        return "No service given", 400
    if delete_credentials_by_email(mail, service) == False:
        return "User not found", 404
    return "Deleted successfully", 205

@app.route('/db/ManipulateCredentials/checkserviceloggedin', methods=['GET'])
def checkserviceloggedin():
    mail = request.args.get('mail')
    service = request.args.get('service')
    if mail == None:
        return "No mail given", 400
    if service == None:
        return "No service given", 400
    result = check_service_logged_in(mail, service)
    if result == 0:
        return "User or service doesn't exist", 404
    if result == 1:
        return "User logged in on this service", 200
    if result == 2:
        return "User not logged in on this service", 401


@app.route('/db/ManipulateCredentials/setaccesstoken', methods=['POST'])
def setaccesstoken():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        service = request_data['service']
    except:
        return "Bad info given, need service", 400
    try:
        access_token = request_data['access_token']
    except:
        return "Bad info given, need access_token", 400
    result = set_access_token(mail, service, access_token)
    if (result == 0):
        return "User not found", 404
    elif (result == 1):
        return "Service not found", 404
    else:
        return "Access token set successfully", 200

@app.route('/db/ManipulateCredentials/setrefreshtoken', methods=['POST'])
def serrefreshtoken():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        service = request_data['service']
    except:
        return "Bad info given, need service", 400
    try:
        refresh_token = request_data['refresh_token']
    except:
        return "Bad info given, need refresh_token", 400
    result = set_access_token(mail, service, refresh_token)
    if (result == 0):
        return "User not found", 404
    elif (result == 1):
        return "Service not found", 404
    else:
        return "Refresh token set successfully", 200

@app.route('/db/ManipulateCredentials/setaccessandrefreshtoken', methods=['POST'])
def setaccessandrefreshtoken():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        service = request_data['service']
    except:
        return "Bad info given, need service", 400
    try:
        access_token = request_data['access_token']
    except:
        return "Bad info given, need access_token", 400
    try:
        refresh_token = request_data['refresh_token']
    except:
        return "Bad info given, need refresh_token", 400
    result = set_access_and_refresh_token(mail, service, access_token, refresh_token)
    if (result == 0):
        return "User not found", 404
    elif (result == 1):
        return "Service not found", 404
    else:
        return "Access and refresh token set successfully", 200

@app.route('/db/ManipulateCredentials/disconectservice', methods=['GET'])
def disconectservice():
    request_data = request.json
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        service = request_data['service']
    except:
        return "Bad info given, need service", 400
    if disconect_service(mail, service) == False:
        return "User not found", 404
    else:
        return "User disconected on this service: "+service,200

#! AREAS ROUTES

@app.route('/db/ManipulateAreas/newarea', methods=['POST'])
def newarea():
    request_data = request.json
    action_params = ""
    reaction_params = ""
    action_data = ""
    reaction_data = ""
    try:
        mail = request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        action = request_data['action']
    except:
        return "Bad info given, need action", 400
    try:
        reaction = request_data['reaction']
    except:
        return "Bad info given, need reaction", 400
    try:
        action_data = request_data['action_data']
        reaction_data = request_data['reaction_data']
        action_params =   request_data['action_params']
        reaction_params = request_data['reaction_params']
    except:
        pass
    resp = new_area(mail, action, False, reaction, False, action_params, reaction_params, action_data, reaction_data)
    if (resp == False):
        return "User not found", 404
    return "Area created", 201

@app.route('/db/ManipulateAreas/getareasfrommail', methods=['GET'])
def getareasfrommail():
    mail = request.args.get('mail')
    if (mail == None):
        return "Bad info given, need mail", 400
    areas = get_area_from_mail(mail)
    json_areas = json.dumps(areas)
    print(json_areas)
    try:
        tmp = areas['notfound']
        return "No areas", 400
    except:
        return json_areas, 200

@app.route('/db/ManipulateAreas/deletespecificarea', methods=['DELETE'])
def deletespecificarea():
    request_data = request.json
    try:
        mail=request_data['mail']
    except:
        return "Bad info given, need mail", 400
    try:
        action=request_data['action']
    except:
        return "Bad info given, need action", 400
    try:
        reaction=request_data['reaction']
    except:
        return "Bad info given, need reaction", 400
    res = delete_area(mail, action, reaction)
    if res == 0:
        return "User not found", 404
    elif res == 1:
        return "Area not found", 404
    else:
        return "Area deleted", 205

@app.route('/db/ManipulateAreas/deleteallareasfrommail', methods=['DELETE'])
def deleteallareasfrommail():
    request_data = request.json
    try:
        mail=request_data['mail']
    except:
        return "Bad info given, need mail", 400
    if delete_all_areas(mail) == False:
        return "User not found", 404
    else:
        return "Areas deleted", 205


if __name__ == '__main__':
    port_server        = config['db']['LOGIN_SERVER_PORT']
    app.run(host="0.0.0.0", port=port_server)
