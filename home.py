import os
import io
import sys

import numpy as np

from flask import Flask, render_template, request, jsonify


home_dir = '/home/aszels/'

sys.path.append(home_dir)
from rplsh import lib as rplsh

app = Flask(__name__)
lsh_main = rplsh.RandomProjectionLSH(vec_space_path=f'{home_dir}/GoogleNews-vectors-negative300.bin', load_dir=f'{home_dir}/hash_table') 

@app.route("/", methods=['GET', 'POST'])
def main_page():
    if request.method == 'POST':
        query = request.get_json()['query']
        return jsonify(lsh_main.search(query))
    else:
        return render_template('main.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))




