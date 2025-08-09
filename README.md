# **Digit Classifier – Full Stack Web Application**

## **1. Overview**
The **Digit Classifier** is a full-stack machine learning web application that recognizes handwritten digits (0–9) drawn by the user in the browser.  
It combines a **deep learning model** for digit recognition with an interactive frontend and a backend API for real-time inference.  

This project demonstrates the ability to:
- Design and train an AI model to solve a real-world problem.
- Build a scalable **full-stack** solution integrating AI, backend, and frontend.
- Deploy the system for **public access** via the web.

**Live Demo:** [Digit Classifier App](https://mridulpathania01.github.io/Digit-Classifier-full-stack/)

---

## **2. Problem Statement**
Handwritten digit recognition is widely used in:
- **Banking:** Check number reading.
- **Postal Services:** Automated ZIP code sorting.
- **Education:** Grading and form processing.
This project solves this by allowing users to draw digits and instantly get predictions powered by a trained deep learning model.

---

## **3. System Architecture**
```
[User Canvas Input] → [Frontend (HTML/CSS/JS)] → [Backend API (Flask/Node.js)]
→ [Trained CNN Model (TensorFlow/Keras)] → [Prediction Response] → [Displayed Result]
```

- **Frontend:**  
  - HTML, CSS, JavaScript (Canvas for drawing input)  
  - Sends image data to backend via REST API.
  
- **Backend:**  
  - Flask (Python) serving as the inference API.
  - Loads pre-trained Convolutional Neural Network (CNN).
  
- **Model:**  
  - Dataset: MNIST Handwritten Digits.
  - Architecture: CNN with convolutional, pooling, dropout, and dense layers.
  - Accuracy: ~99% on test set.
  
- **Deployment:**  
  - Frontend hosted on GitHub Pages.
  - Backend deployable via Flask/Heroku/AWS.

---

## **4. Features**
✅ Real-time digit prediction.  
✅ Interactive drawing canvas.  
✅ Responsive UI for desktop & mobile.  
✅ AI model with >99% accuracy on MNIST dataset.  
✅ Modular design — model, backend, and frontend can be independently updated.  

---

## **5. Installation & Setup**
### **Clone Repository**
```bash
git clone https://github.com/mridulpathania01/Digit-Classifier-full-stack.git
cd Digit-Classifier-full-stack
```

### **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### **Frontend Setup**
Simply open the `index.html` file in your browser, or deploy via GitHub Pages.

---

## **6. Model Training**
1. **Data Preprocessing:** Normalize pixel values to range [0, 1].  
2. **Architecture:**
```python
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
    MaxPooling2D((2,2)),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D((2,2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])
```
3. **Training Parameters:**  
   - Optimizer: Adam  
   - Loss: Categorical Crossentropy  
   - Epochs: 10  
   - Batch size: 128  

---

## **7. Usage**
1. Draw a digit in the on-screen canvas.
2. Click **Predict**.
3. See the predicted digit and model confidence.

---

## **9. Design Decisions**
- **CNN over MLP:** Better for image pattern recognition.  
- **Flask API:** Lightweight and fast for model serving.  
- **GitHub Pages:** Free hosting for static frontend.  
- **Separation of Concerns:** Backend & frontend decoupled for scalability.

---

## **10. Future Improvements**
- Support multi-digit recognition.
- Deploy backend on cloud (AWS/GCP) for better scalability.
- Add real-time handwriting smoothing.
- Implement offline Progressive Web App (PWA) mode.

---

## **11. License**
This project is licensed under the MIT License.
