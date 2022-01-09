def csv_string_to_list(csv_string):
    list = []
    for value in csv_string.split(","):
        value = value.strip()
        list.append(value)
    return list

def list_to_csv_string(list):
    return ",".join(list)

def retrieve_if_not_empty(item):
    return item if not "" else None

def filter_by(objects, field, values, special_func=None, is_date=False):
    filtered = []
    for the_object in objects:
        if hasattr(the_object, field):
            object_field = getattr(the_object, field)
            if object_field is None or object_field == "":
                continue
            if not special_func:
                if not isinstance(values, list):
                    values = [values.lower()]
                else:
                    values = [x.lower() for x in values]
                if any(match in object_field.lower() for match in values):
                    filtered.append(the_object)
            else:
                try:
                    if special_func is not None and special_func(object_field, values, is_date):
                        filtered.append(the_object)
                except:
                    continue
    return filtered