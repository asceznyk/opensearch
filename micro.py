import os
import io
import sys
import json

import numpy as np

from flask import Flask, render_template, request, jsonify

with open('config.json') as f:
    config = json.load(f)

from rplsh import lib as rplsh

app = Flask(__name__)
lsh_main = rplsh.RandomProjectionLSH(
    vec_space_path=config['vec_space_path'], 
    load_dir=config['load_dir']
)

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        top_words = {"words":[], "scores":[]}
        try:
            results = lsh_main.search(request.get_json()['query'])
            print(results)
            for k, v in results.items():
                top_words["words"].append(f"{k}")
                top_words["scores"].append(f"{v}")
        except Exception as e:
            print(f"error occured: {e}")
            pass

        return json.dumps(top_words)
    else:
        return render_template('main.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))




