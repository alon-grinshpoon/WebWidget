#!/usr/bin/python

import cgi

params = cgi.FieldStorage()

print "Content-Type: text/javascript\n"

if not 'callback' in params:
    print "ERROR: you must pass a callback parameter"
else:
    jsonp = "%s ( {'html': '<strong>Hello World!</strong>', \
    'product_id_1': '1614eed5-e7b2-426b-b686-7214e5d4ecd1', \
    'product_name_1': 'Good Vibes Only Mantra Socks', \
    'product_pic_1': '6cbbc0ac-2dbc-4a78-9ed7-dfaaf1cdf63a.jpg', \
    'product_price_1': '20.00', \
    'product_id_2': 'bd3e6116-24da-4ed8-87a4-9ccc264a84ea', \
    'product_name_2': 'SOMA WATER FILTER PITCHER, 10-CUP', \
    'product_pic_2': 'b839b165-fb1a-456e-9d04-5fbdb692f38a.jpg', \
    'product_price_2': '39.99', \
    'product_id_3': 'bd3e6116-24da-4ed8-87a4-9ccc264a84ea', \
    'product_name_3': 'BLUE BOTTLE LOVE ~ THE WATER CODE', \
    'product_pic_3': '19883d3a-b6d4-4c4f-b3d0-99f135cecf06.jpg', \
    'product_price_3': '25.00' } )"
    print jsonp % params['callback'].value
