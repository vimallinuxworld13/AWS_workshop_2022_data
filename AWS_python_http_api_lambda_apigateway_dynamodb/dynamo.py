# A utility function to convert a dict into DynamoDB object
def to_item(raw):
    if type(raw) is dict:
        resp = {}
        for k, v in raw.items():
            if type(v) is str:
                resp[k] = {
                    'S': v
                }
            elif type(v) is int:
                resp[k] = {
                    'N': str(v)
                }
            elif type(v) is dict:
                resp[k] = {
                    'M': to_item(v)
                }
            elif type(v) is bool:
                resp[k] = {
                    'BOOL': v
                }
            elif type(v) is list:
                resp[k] = []
                for i in v:
                    resp[k].append(to_item(i))
        return resp
    elif type(raw) is str:
        return {
            'S': raw
        }
    elif type(raw) is int:
        return {
            'N': str(raw)
        }

# A utility function to convert a DynamoDB object into a dict(json)
def to_dict(raw):
    if type(raw) is dict:
        resp = {}
        for k, v in raw.items():
            if 'S' in v:
                resp[k] = v['S']
            elif 'N' in v:
                resp[k] = int(v['N'])
            elif 'M' in v:
                resp[k] = to_dict(v['M'])
            elif 'BOOL' in v:
                resp[k] = bool(v['BOOL'])
            elif v is list:
                resp[k] = []
                for i in v:
                    resp[k].append(to_item(i))
    return resp