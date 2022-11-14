import requests
import os
import json

access_token = ""

def create_url(id, accessToken):
    global access_token
    access_token = accessToken
    url = "https://api.twitter.com/2/users/{}/tweets".format(id)
    return url, {"tweet.fields": "created_at"}

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {access_token}"
    r.headers["User-Agent"] = "v2UserTweetsPython"
    return r

def connect_to_endpoint(url, params):
    response = requests.request("GET", url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.status_code, response.json()
