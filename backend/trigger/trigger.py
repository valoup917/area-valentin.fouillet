#!/usr/bin/env python3

import time
import datetime
import logging
import requests
import psycopg2


uuid_index = 0
action_index = 1
action_done_index = 2
reaction_index = 3
reaction_done_index = 4
action_params_index = 5
reaction_params_index = 6
action_data_index = 7
reaction_data_index = 8

action_choice = 1
reaction_choice = 2

body_index = 0
header_index = 1
query_index = 2

services = [
    'discord',
    'twitter',
    'google',
    'github',
    'linkedin',
    'spotify',
    'twitch',
]

user        = 'Zesor'
host        = '195.154.70.148'
db_name     = 'rdb'
db_password = 'Zesor29012014@'
port        = '42535'

# Uncomment in production
logging.basicConfig(filename='trigger.log',filemode='w', format='%(asctime)s - %(levelname)s - %(message)s', datefmt='%d-%b %H:%M:%S',)

# Uncomment in test env
#logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S', level=logging.DEBUG)


# USE OF LOGGING LIB

# logging.debug('This is a debug message')
# logging.info('This is an info message')
# logging.warning('This is a warning message')
# logging.error('This is an error message')
# logging.critical('This is a critical message')

def get_table():
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    query = "select * from areas;"
    cursor.execute(query)
    res = cursor.fetchall()
    cursor.close()
    conn.close()
    return res

def update_reaction_state_uuid(uuid, action, reaction, reaction_state):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    query="update areas set reaction_done=" + str(reaction_state) + " where areas.uuid='" + uuid + "' and areas.action='" + action + "' and areas.reaction='" + reaction + "';"
    cursor.execute(query)
    cursor.close()
    conn.close()

def get_uuid(mail):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    getuuid = "select uuid from login where mail='" + str(mail) + "';";
    cursor.execute(getuuid)
    tmpuuid = cursor.fetchall()
    uuid = tmpuuid[0][0]
    cursor.close()
    conn.close()
    return uuid

def update_action_state_uuid(uuid, action, reaction, action_state):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    query="update areas set action_done=" + str(action_state) + " where areas.uuid='" + uuid + "' and areas.action='" + action + "' and areas.reaction='" + reaction + "';"
    cursor.execute(query)
    cursor.close()
    conn.close()

def update_action_state(mail, action, reaction, action_state):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    uuid = get_uuid(mail)
    query="update areas set action_done=" + str(action_state) + " where areas.uuid='" + uuid + "' and areas.action='" + action + "' and areas.reaction='" + reaction + "';"
    cursor.execute(query)
    cursor.close()
    conn.close()

def delete_area_uuid(uuid, action ,reaction):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    query="delete from areas where uuid='" + uuid + "' and action='" + action + "' and reaction='" + reaction + "';"
    cursor.execute(query)
    cursor.close()
    conn.close()

def get_service_token(uuid, service):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    query = "select access_token from credentials where uuid='"+ uuid + "';"
    cursor.execute(query)
    res = cursor.fetchall()
    cursor.close()
    conn.close()
    return res

def parse_param(parameter):
    param_list = parameter.split(',')
    param_data = dict()
    for param in param_list:
        temp = param.split(':')
        if len(temp) > 1:
            param_data[temp[0]] = temp[1]
        else:
            param_data[temp[0]] = "empty"
    return param_data

def interpret_parameters(params):
    is_body = False
    is_header = False
    is_query = False
    for param in params:
        if params[param] == "header":
            is_header = True
        elif params[param] == "body":
            is_body = True
        elif params[param] == "query":
            is_query = True
    return (is_body, is_header, is_query)

def set_access_token(header, route, uuid):
    req_service = ""
    splitted = route.split('/')
    for slice in splitted:
        for service in services:
            if slice.upper() == service.upper():
                req_service = service
    if len(req_service) == 0:
        return
    res = get_service_token(uuid, req_service)
    if len(res) > 1 or len(res[0])> 1:
        token = res[6]
    header.update({"Authorization": token[0]})

def set_parameters(params, datas, route, uuid):
    body = {}
    header = {}
    query = str("")

    place_in_body = []
    place_in_header = []
    place_in_query = []

    for param in params:
        if params[param] == "body":
            place_in_body.append(param)
        if params[param] == "headers":
            place_in_header.append(param)
        if params[param] == "query":
            place_in_query.append(param)

    first_query_elem = True

    for data in datas:
        for in_body in place_in_body:
            if (data == in_body):
                body.update({data: datas[data]})

        for in_header in place_in_header:
            if (in_header == "access_token"):
                set_access_token(header,route, uuid)
            if (data == in_header and data != "access_token"):
                header.update({data:datas[data]})

        for in_query in place_in_query:
            if (data == in_query):
                if (first_query_elem):
                    query = query + "?" + in_query + "=" + str(datas[data])
                    first_query_elem = False
                else:
                    query = query + "&" + in_query + "=" + str(datas[data])
    return (body, header, query)

def call_route(route, params, route_params):
    try:
        temp = params['methods']
    except:
        return (404, "Unknown route")
    if (temp == "get"):
        tmp = route
        if (len(route_params[query_index]) != 0):
            tmp = str(tmp) + str(route_params[query_index])
        response = requests.get(tmp, headers=route_params[header_index], json=route_params[body_index])
    elif(temp == 'post'):
        tmp = route
        if (len(route_params[query_index]) != 0):
            tmp = str(tmp) + str(route_params[query_index])
        response = requests.post(route, route_params[body_index], route_params[header_index])
    elif(temp == 'delete'):
        tmp = route
        if (len(route_params[query_index]) != 0):
            tmp = str(tmp) + str(route_params[query_index])
        response = requests.delete(route, route_params[body_index], route_params[header_index])
    elif(temp == 'put'):
        tmp = route
        if (len(route_params[query_index]) != 0):
            tmp = str(tmp) + str(route_params[query_index])
        response = requests.put(route, route_params[body_index], route_params[header_index])
    else:
        return (404, "Unknown method")
    return (response.status_code, response.content)

def ping_route(area, choice):
    if (choice == action_choice):
        params = parse_param(area[action_params_index])
        datas = parse_param(area[action_data_index])
        route_params = set_parameters(params, datas, area[action_index], area[uuid_index])
    elif (choice == reaction_choice):
        params = parse_param(area[reaction_params_index])
        datas = parse_param(area[reaction_data_index])
        route_params = set_parameters(params, datas, area[reaction_index], area[uuid_index])

    if (choice == action_choice):
        code = call_route(area[action_index], params, route_params)
        return code
    elif (choice == reaction_choice):
        code = call_route(area[reaction_index], params, route_params)
        return code

def main():
    while True:
        now = datetime.datetime.now()
        areas = get_table()
        for area in areas:
            if (area[action_done_index] == False and area[reaction_done_index] == False):
                code = ping_route(area, action_choice)
                if (code[0] == 200):
                    update_action_state_uuid(area[uuid_index], area[action_index], area[reaction_index], True)
                    logging.info('SUCCESS: action'+area[action_index]+' success with code:'+str(code[0])+" "+str(code[1]))
                else:
                    logging.error('FAILED: action'+area[action_index]+' failed with code:'+str(code[0])+" "+str(code[1]))
            elif (area[action_done_index] == True and area[reaction_done_index] == False):
                code = ping_route(area, reaction_choice)
                if (code[0] == 200):
                    logging.info('SUCCESS: action'+area[action_index]+' sucess with code:'+str(code[0])+" "+str(code[1]))
                    update_reaction_state_uuid(area[uuid_index], area[action_index], area[reaction_index], True)
                else:
                    logging.error('FAILED: reaction'+area[reaction_index]+' failed with code:'+str(code[0])+" "+str(code[1]))
            if(area[action_done_index] == True and area[reaction_done_index] == True):
                logging.info('DELETE: area of user:'+area[uuid_index]+' with action:'+area[action_index]+'and reaction:'+area[reaction_index])
                delete_area_uuid(area[uuid_index], area[action_index], area[reaction_index])
            time.sleep(0.5)
        time.sleep(5)

if __name__ == '__main__':
    main()