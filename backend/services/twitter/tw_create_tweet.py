import requests

access_token = ""

def create_url(accessToken):
    global access_token
    access_token = accessToken
    url = "https://api.twitter.com/2/tweets"
    return url

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {access_token}"
    return r

def connect_to_endpoint(text, url):
    payload = { "text": text }
    response = requests.request("POST", url, auth=bearer_oauth, json=payload)

    if response.status_code != 201:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.status_code, response.json()
