import requests
import json


PROXY_RENDER_ADDRESS = 'http://localhost:3000/'


def get_html(filename, props):
    try:
        props_str = json.dumps(props)
        r = requests.post(url=PROXY_RENDER_ADDRESS + filename
                          , data=props_str
                          , headers={'Content-Type': 'application/json'})

        if r.status_code == 200:
            return r.text, props_str
    except Exception as e:
        print(e)

    return False, False
