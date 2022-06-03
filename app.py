from flask import Flask, render_template, redirect, request

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])

def index():
    nums=[1,2,3,4,5,6,7,8,9,10]

    if request.method == 'POST':
        
        return redirect('/')
    return render_template("index.html")


app.run(debug=True)