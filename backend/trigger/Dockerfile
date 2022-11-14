FROM python:3

WORKDIR /trigger

COPY . ./


RUN pip install --upgrade pip

RUN pip3 install -r requirements.txt

CMD [ "python3", "trigger.py" ]
