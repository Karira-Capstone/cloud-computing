import pandas as pd
from flask import Flask, request, jsonify
from tensorflow import keras
import requests

app = Flask(__name__)

def vocab():
    vocab = []
    with open("/app/vocab/project_tag_vocab.txt") as fp:
        for line in fp:
            x = line.strip()
            vocab.append(x)
    return vocab

# project_tags_model = keras.models.load_model(r"D:\Coding\karira2\project_tags_model\my_model")
project_tags_model = keras.models.load_model("/app/project_tag_model/my_model")

@app.route("/predict", methods=["POST"])
def predict():
    data_dict = request.get_json()
    text = data_dict["text"]

    user_input = pd.Series([text])
    predicted_probabilities = project_tags_model.predict(user_input)

    prediction = [x for _, x in sorted(zip(predicted_probabilities[0], vocab()),
                                       key=lambda pair: pair[0],
                                       reverse=True)][:4]
    
    return jsonify({"Rekomendasi Budget": prediction})

def test_flask_app():
    url = 'http://localhost:5000/predict'
    data = {'text': 'menulis'}
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        print('Flask app is working.')
        print('Response:')
        print(response.json())
    else:
        print('Error: Unable to access the Flask app.')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# Call the function to test the Flask app
test_flask_app()
