import os
import io
import sys
import json

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
        results = lsh_main.search(request.get_json()['query'])
        print(results)
        top_words = {"words":[], "scores":[]}
        for k, v in results.items():
            top_words["words"].append(k.replace("'", '"'))
            top_words["scores"].append(v)
        return json.dumps(str(top_words))
    else:
        return render_template('main.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))




