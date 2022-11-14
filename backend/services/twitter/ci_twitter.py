import tw_liked_tweets as tw_liked_tweets
import tw_followers as tw_followers
import unittest
import json

file = open('./.db.json')
user = json.load(file)
file.close()

# `pip install unittest` to install unittest module for python
# `python3 -m unittest ci_twitter.py` to run ci test for twitter endpoints

class TestTwitterAPI(unittest.TestCase):
    global user

    def test_followers_with_correct_user_id(self):
        url, tweet_fields = tw_followers.create_url(user)
        response_status, initial_json_response = tw_followers.connect_to_endpoint(url, tweet_fields)
        self.assertEqual(response_status, 200)

    def test_liked_tweets_with_correct_user_id(self):
        url, tweet_fields = tw_liked_tweets.create_url(user)
        response_status, initial_json_response = tw_liked_tweets.connect_to_endpoint(url, tweet_fields)
        self.assertEqual(response_status, 200)

if "__main__" == __name__:
    unittest.main()