import requests
import os

access_token = ""

def create_url(id, accessToken):
    global access_token
    access_token = accessToken
    tweet_fields = "tweet.fields=lang,author_id"
    url = "https://api.twitter.com/2/users/{}/followers".format(id)
    return url, tweet_fields

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {access_token}"
    r.headers["User-Agent"] = "v2FollowersLookupPython"
    return r

def connect_to_endpoint(url, tweet_fields):
    response = requests.request(
        "GET", url, auth=bearer_oauth, params=tweet_fields)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.status_code, response.json()
