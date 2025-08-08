const backendURL = "https://digit-classifier-full-stack.onrender.com/predict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "black";
ctx.lineWidth = 15;
ctx.lineCap = "round";

canvas.addEventListener("mousedown", () => { drawing = true; });
canvas.addEventListener("mouseup", () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener("mousemove", draw);

function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

// Clear button
document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Predict button
document.getElementById("predictBtn").addEventListener("click", async () => {
    let imgData = ctx.getImageData(0, 0, 280, 280);

    // Create an off-screen canvas to resize
    let tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = 28;
    tmpCanvas.height = 28;
    let tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.drawImage(canvas, 0, 0, 28, 28);

    // Convert to grayscale
    let imgArray = [];
    let pixels = tmpCtx.getImageData(0, 0, 28, 28).data;
    for (let i = 0; i < pixels.length; i += 4) {
        let avg = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
        imgArray.push(avg);
    }

    // Normalize pixel values
    imgArray = imgArray.map(v => v / 255.0);

    // Send to backend
    try {
        const res = await fetch(backendURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imgArray })
        });

        const data = await res.json();
        document.getElementById("prediction").innerText = "Prediction: " + data.prediction;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("prediction").innerText = "Error predicting.";
    }
});
