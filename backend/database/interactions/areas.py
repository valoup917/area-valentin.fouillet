import psycopg2
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

user        = 'Zesor'
host        = '195.154.70.148'
db_name     = 'rdb'
db_password = 'Zesor29012014@'
port        = '42535'

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

def get_area_from_mail(mail):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    uuid = get_uuid(mail)
    query = "select * from areas where uuid ='" + uuid + "';"
    cursor.execute(query)
    res = cursor.fetchall()
    cursor.close()
    conn.close()
    return res

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

def delete_area(mail, action ,reaction):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    uuid = get_uuid(mail)
    query="delete from areas where uuid='" + uuid + "' and action='" + action + "' and reaction='" + reaction + "';"
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

def delete_all_areas(mail):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    uuid = get_uuid(mail)
    query="delete from areas where uuid='" + uuid + "';"
    cursor.execute(query)
    cursor.close()
    conn.close()

def update_reaction_state(mail, action, reaction, reaction_state):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    uuid = get_uuid(mail)
    query="update areas set reaction_done=" + str(reaction_state) + " where areas.uuid='" + uuid + "' and areas.action='" + action + "' and areas.reaction='" + reaction + "';"
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

def update_reaction_state_uuid(uuid, action, reaction, reaction_state):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    query="update areas set reaction_done=" + str(reaction_state) + " where areas.uuid='" + uuid + "' and areas.action='" + action + "' and areas.reaction='" + reaction + "';"
    cursor.execute(query)
    cursor.close()
    conn.close()

def update_action_state_uuid(uuid, action, reaction, action_state):
    conn = psycopg2.connect(database=db_name, user=user, host=host, password=db_password, port=port)
    conn.autocommit = True
    cursor = conn.cursor()
    query="update areas set action_done=" + str(action_state) + " where areas.uuid='" + uuid + "' and areas.action='" + action + "' and areas.reaction='" + reaction + "';"
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
