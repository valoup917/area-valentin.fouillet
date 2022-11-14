import requests
import os

access_token = ""

def create_url(id, accessToken):
    global access_token
    access_token = accessToken
    url = "https://api.twitter.com/2/users/{}/bookmarks".format(id)
    return url

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {access_token}"
    r.headers["User-Agent"] = "BookmarksSampleCode"
    return r

def connect_to_endpoint(url):
    response = requests.request(
        "GET", url, auth=bearer_oauth,)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.status_code, response.json()
