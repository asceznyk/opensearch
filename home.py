import os
import io
import sys

import numpy as np

from flask import Flask, render_template, request, jsonify

sys.path.append('/home/ahansnash')
from rplsh import lib as rplsh

app = Flask(__name__)
lsh_main = rplsh.RandomProjectionLSH(vec_space_path='gs://vector_spaces/GoogleNews-vectors-negative300.bin', load_dir='gs://vector_spaces/hash_table') 

@app.route("/", methods=['GET', 'POST'])
def main_page():
    if request.method == 'POST':
        query = request.get_json()
        return jsonify(query)
    else:
        return render_template('main.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))




