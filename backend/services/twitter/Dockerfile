FROM python:3

WORKDIR /twitter

COPY . ./

RUN pip3 install -r requirements.txt

EXPOSE 9005

CMD [ "python3", "twitter_api.py" ]
