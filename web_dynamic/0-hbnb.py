import os
import uuid
from flask import Flask, render_template

app = Flask(__name__)

# Update the route to /0-hbnb/
@app.route('/0-hbnb/')
def hbnb():
    cache_id = uuid.uuid4()
    return render_template('0-hbnb.html', cache_id=cache_id)

# Use 8-hbnb.html if 100-hbnb.html is not present
if not os.path.isfile('web_dynamic/templates/0-hbnb.html'):
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['ENV'] = 'development'

# Start the Flask web application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

