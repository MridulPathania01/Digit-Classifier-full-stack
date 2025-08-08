from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import cv2
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
model = load_model("digit_cnn.h5")

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    img = np.array(data["image"], dtype=np.uint8)
    img = 255 - img  # invert colors

    _, img = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY)

    coords = cv2.findNonZero(img)
    x, y, w, h = cv2.boundingRect(coords)
    img = img[y:y+h, x:x+w]

    img = cv2.resize(img, (20, 20), interpolation=cv2.INTER_AREA)
    img = np.pad(img, ((4, 4), (4, 4)), 'constant', constant_values=0)
    img = img.reshape(1, 28, 28, 1) / 255.0

    prediction = np.argmax(model.predict(img))
    return jsonify({"prediction": int(prediction)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
