import configparser
import tw_followers as tw_followers
import tw_following as tw_following
import tw_liked_tweets as tw_liked_tweets
import tw_liking_users as tw_liking_users
import tw_user_me as tw_user_me
import tw_user_tweets as tw_user_tweets
import tw_create_tweet as tw_create_tweet
import tw_bookmarks as tw_bookmarks
import tw_conversation as tw_conversation
import tw_retweeted_by as tw_retweeted_by
from flask import Flask, request

MAX_REQUEST_NUMBER  =   (15)

# read configs
config = configparser.ConfigParser()
config.read('config.ini')

HOST                = config['twitter']['host']
PORT                = config['twitter']['port']

app = Flask(__name__)

users = {}

@app.route('/twitter/ping', methods=['GET'])

def ping():
    return "Ok", 200

@app.route('/twitter/name')
def name():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except:
        return "Bad info given need Authorization", 400

    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    if response_status == 204:
        status_code = 400
    elif userId not in users:
        users[userId] = {'twitter': { 'name': json_response['data']['name'] }}
    else:
        if 'name' not in users[userId]['twitter']:
            users[userId]['twitter']['name'] = json_response['data']['name']
        elif users[userId]['twitter']['name'] != json_response['data']['name']:
            users[userId]['twitter']['name'] = json_response['data']['name']
            status_code = 200
    print(users)
    return str(status_code), status_code

@app.route('/twitter/username', methods=['GET'])
def username():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except Exception as err:
        return "Bad info given, need Authorization", 400
    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    if response_status == 204:
        status_code = 400
    elif userId not in users:
        users[userId] = {'twitter': { 'username': json_response['data']['username'] }}
    else:
        if 'username' not in users[userId]['twitter']:
            users[userId]['twitter']['username'] = json_response['data']['username']
        elif users[userId]['twitter']['username'] != json_response['data']['username']:
            users[userId]['twitter']['username'] = json_response['data']['username']
            status_code = 200
    print(users)
    return str(status_code), status_code

@app.route('/twitter/bookmarks', methods=['GET'])
def bookmarks():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except:
        return "Bad info given need Authorization", 400

    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    url = tw_bookmarks.create_url(userId, access_token)
    response_status, json_response = tw_bookmarks.connect_to_endpoint(url)
    if response_status == 204:
        status_code = 400
    elif userId not in users:
        users[userId] = {'twitter': { 'bookmarks': json_response['meta']['result_count'] }}
    else:
        if 'bookmarks' not in users[userId]['twitter']:
            users[userId]['twitter']['bookmarks'] = json_response['meta']['result_count']
        elif users[userId]['twitter']['bookmarks'] != json_response['meta']['result_count']:
            users[userId]['twitter']['bookmarks'] = json_response['meta']['result_count']
            status_code = 200
    print(users)
    return str(status_code), status_code

@app.route('/twitter/messages', methods=['GET'])
def conversation():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except:
        return "Bad info given need Authorization", 400
    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']

    url = tw_conversation.create_url(access_token)
    response_status, json_response = tw_conversation.connect_to_endpoint(url)
    if response_status == 204:
        status_code = 400
    elif userId not in users:
        users[userId] = {'twitter': { 'messages': json_response['meta']['result_count'] }}
    else:
        if 'messages' not in users[userId]['twitter']:
            users[userId]['twitter']['messages'] = json_response['meta']['result_count']
        elif users[userId]['twitter']['messages'] != json_response['meta']['result_count']:
            users[userId]['twitter']['messages'] = json_response['meta']['result_count']
            status_code = 200
    print(users)
    return str(status_code), status_code

@app.route('/twitter/userTweets', methods=['GET'])
def user_tweets():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except:
        return "Bad info given need Authorization", 400

    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    url, tweet_fields = tw_user_tweets.create_url(userId, access_token)
    response_status, json_response = tw_user_tweets.connect_to_endpoint(url, tweet_fields)
    if response_status == 204:
        status_code = 400
    elif userId not in users:
        users[userId] = {'twitter': { 'tweets': json_response['meta']['result_count'] }}
    else:
        if 'tweets' not in users[userId]['twitter']:
            users[userId]['twitter']['tweets'] = json_response['meta']['result_count']
        elif users[userId]['twitter']['tweets'] != json_response['meta']['result_count']:
            users[userId]['twitter']['tweets'] = json_response['meta']['result_count']
            status_code = 200
    print(users)
    return str(status_code), status_code

@app.route('/twitter/following', methods=['GET'])
def following():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except Exception as err:
        return "Bad info given, need Authorization", 400
    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    url, tweet_fields = tw_following.create_url(userId, access_token)
    response_status, json_response = tw_following.connect_to_endpoint(url, tweet_fields)
    if response_status == 204:
        status_code = 400
    elif userId not in users:
        users[userId] = {'twitter': { 'following': json_response['meta']['result_count'] }}
    else:
        if 'following' not in users[userId]['twitter']:
            users[userId]['twitter']['following'] = json_response['meta']['result_count']
        elif users[userId]['twitter']['following'] != json_response['meta']['result_count']:
            users[userId]['twitter']['following'] = json_response['meta']['result_count']
            status_code = 200
    print(users)
    return str(status_code), status_code

@app.route('/twitter/followers', methods=['GET'])
def followers():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except Exception as err:
        return "Bad info given, need Authorization", 400
    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    url, tweet_fields = tw_followers.create_url(userId, access_token)
    response_status, json_response = tw_followers.connect_to_endpoint(url, tweet_fields)
    if response_status == 204:
        status_code = 400
    elif userId not in users:
        users[userId] = {'twitter': { 'followers': json_response['meta']['result_count'] }}
    else:
        if 'followers' not in users[userId]['twitter']:
            users[userId]['twitter']['followers'] = json_response['meta']['result_count']
        elif users[userId]['twitter']['followers'] != json_response['meta']['result_count']:
            users[userId]['twitter']['followers'] = json_response['meta']['result_count']
            status_code = 200
    print(users)
    return str(status_code), status_code

@app.route('/twitter/likedTweets')
def liked_tweets():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except:
        return "Bad info given need Authorization", 400
    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    url, tweet_fields = tw_liked_tweets.create_url(userId, access_token)
    response_status, json_response = tw_liked_tweets.connect_to_endpoint(url, tweet_fields)
    if response_status == 204:
        status_code = 400
    elif userId not in users:
        users[userId] = {'twitter': { 'likedTweets': json_response['meta']['result_count'] }}
    else:
        if 'likedTweets' not in users[userId]['twitter']:
            users[userId]['twitter']['likedTweets'] = json_response['meta']['result_count']
        elif users[userId]['twitter']['likedTweets'] != json_response['meta']['result_count']:
            users[userId]['twitter']['likedTweets'] = json_response['meta']['result_count']
            status_code = 200
    print(users)
    return str(status_code), status_code

@app.route('/twitter/likingUsers', methods=['GET'])
def liking_users():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except:
        return "Bad info given need Authorization", 400

    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    url, tweet_fields = tw_user_tweets.create_url(userId, access_token)
    response_status, json_response = tw_user_tweets.connect_to_endpoint(url, tweet_fields)
    if response_status != 200:
        raise Exception(
            "Error in request, code: {}".format(response_status)
        )
    number_request = 0
    for tweets in json_response['data']:
        if number_request == MAX_REQUEST_NUMBER:
            break
        url, tweet_fields = tw_liking_users.create_url(access_token, tweets['id'])
        response_status, json_response = tw_liking_users.connect_to_endpoint(url, tweet_fields)
        if userId not in users:
            users[userId] = {'twitter': { 'likingUsers': { tweets['id']: json_response['meta']['result_count'] }}}
        else:
            if 'likingUsers' not in users[userId]['twitter']:
                users[userId]['twitter']['likingUsers'] = {tweets['id']: json_response['meta']['result_count']}
            elif tweets['id'] not in users[userId]['twitter']['likingUsers']:
                users[userId]['twitter']['likingUsers'][tweets['id']] = json_response['meta']['result_count']
            elif users[userId]['twitter']['likingUsers'][tweets['id']] != json_response['meta']['result_count']:
                users[userId]['twitter']['likingUsers'][tweets['id']] = json_response['meta']['result_count']
                status_code = 200
        number_request += 1
    print(users)
    return str(status_code), status_code

@app.route('/twitter/retweetedBy', methods=['GET'])
def retweeted_by():
    status_code = 400
    access_token = ""
    try:
        access_token = (request.headers['Authorization'])
    except:
        return "Bad info given need Authorization", 400

    url = tw_user_me.create_url(access_token)
    response_status, json_response = tw_user_me.connect_to_endpoint(url)
    userId = json_response['data']['id']
    url, tweet_fields = tw_user_tweets.create_url(userId, access_token)
    response_status, json_response = tw_user_tweets.connect_to_endpoint(url, tweet_fields)
    if response_status != 200:
        raise Exception(
            "Error in request, code: {}".format(response_status)
        )
    number_request = 0
    for tweets in json_response['data']:
        if number_request == MAX_REQUEST_NUMBER:
            break
        url, tweet_fields = tw_retweeted_by.create_url(access_token, tweets['id'])
        response_status, json_response = tw_retweeted_by.connect_to_endpoint(url, tweet_fields)
        if userId not in users:
            users[userId] = {'twitter': { 'retweetedBy': { tweets['id']: json_response['meta']['result_count'] }}}
        else:
            if 'retweetedBy' not in users[userId]['twitter']:
                users[userId]['twitter']['retweetedBy'] = {tweets['id']: json_response['meta']['result_count']}
            elif tweets['id'] not in users[userId]['twitter']['retweetedBy']:
                users[userId]['twitter']['retweetedBy'][tweets['id']] = json_response['meta']['result_count']
            elif users[userId]['twitter']['retweetedBy'][tweets['id']] != json_response['meta']['result_count']:
                users[userId]['twitter']['retweetedBy'][tweets['id']] = json_response['meta']['result_count']
                status_code = 200
        number_request += 1
    return str(status_code), status_code


@app.route('/twitter/createTweet', methods=['POST'])
def create_tweet():
    access_token = ""
    text = ""
    try:
        access_token = (request.headers['Authorization'])
        text = (request.get_json()['text'])
        #
        # Le Body doit ressembler à:
        #
        #       {
        #           "text": "New tweet"
        #       }
        #
    except Exception as err:
        return "Bad info given, need Authorization and text", 400
    if len(text) == 0:
        return "Bad info given need text", 400
    url = tw_create_tweet.create_url(access_token)
    response_status, json_response = tw_create_tweet.connect_to_endpoint(text, url)
    return json_response, response_status

if __name__ == "__main__":
    app.run(host=HOST, port=PORT)
