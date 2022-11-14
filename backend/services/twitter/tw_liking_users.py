import requests
import os
import json

access_token = ""

def create_url(accessToken, tweet_id):
    global access_token
    access_token = accessToken
    user_fields = "user.fields=created_at,description"
    url = "https://api.twitter.com/2/tweets/{}/liking_users".format(tweet_id)
    return url, user_fields

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {access_token}"
    r.headers["User-Agent"] = "v2LikingUsersPython"
    return r

def connect_to_endpoint(url, user_fields):
    response = requests.request("GET", url, auth=bearer_oauth, params=user_fields)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.status_code, response.json()
