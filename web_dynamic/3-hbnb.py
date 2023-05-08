#!/usr/bin/python3
"""
Starts a Flask web application.
"""
from flask import Flask, render_template
from os import environ
app = Flask(__name__)


@app.route('/3-hbnb')
def display_hbnb():
    """
    Display HBNB home page
    """
    return render_template('2-hbnb.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=environ.get('HBNB_API_PORT', 5000))

