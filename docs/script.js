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
    let tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = 28;
    tmpCanvas.height = 28;
    let tmpCtx = tmpCanvas.getContext("2d");

    // Resize original drawing to 28x28
    tmpCtx.drawImage(canvas, 0, 0, 28, 28);

    // Convert to grayscale and build 2D array
    let imgArray = [];
    let pixels = tmpCtx.getImageData(0, 0, 28, 28).data;
    for (let y = 0; y < 28; y++) {
        let row = [];
        for (let x = 0; x < 28; x++) {
            let idx = (y * 28 + x) * 4;
            let avg = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
            row.push(Math.round(avg)); // integer 0–255
        }
        imgArray.push(row);
    }

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
