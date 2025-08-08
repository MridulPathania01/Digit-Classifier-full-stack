from flask import Flask, request, jsonify, send_from_directory
from tensorflow.keras.models import load_model
import numpy as np
import cv2

app = Flask(__name__)
model = load_model("digit_cnn.h5")

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    img = np.array(data["image"], dtype=np.uint8)

    # Invert colors (black bg, white digit)
    img = 255 - img

    # Threshold to make it binary
    _, img = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY)

    # Find bounding box of digit and crop
    coords = cv2.findNonZero(img)
    x, y, w, h = cv2.boundingRect(coords)
    img = img[y:y+h, x:x+w]

    # Resize to 20x20, then pad to 28x28
    img = cv2.resize(img, (20, 20), interpolation=cv2.INTER_AREA)
    img = np.pad(img, ((4, 4), (4, 4)), 'constant', constant_values=0)

    # Normalize and reshape
    img = img.reshape(1, 28, 28, 1) / 255.0

    prediction = np.argmax(model.predict(img))
    return jsonify({"prediction": int(prediction)})

if __name__ == "__main__":
    app.run(debug=True)
