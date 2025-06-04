
let controlBtn = document.getElementById("controlBtn");
let statusText = document.getElementById("status");
let started = false;

controlBtn.addEventListener("click", () => {
    started = !started;
    controlBtn.textContent = started ? "Остановить" : "Запустить";
    controlBtn.classList.toggle("stop", started);
    statusText.textContent = "Статус: " + (started ? "Запущено" : "Остановлено");

    const message = started ? "start" : "stop";

    // Отправка команды по MQTT через WebSocket
    if (client && client.isConnected()) {
        client.publish("valley/command", message);
    }
});

// MQTT client init
const client = new Paho.MQTT.Client("wss://broker.hivemq.com:8884/mqtt", "webclient_" + Math.random());
client.connect({ onSuccess: () => console.log("Connected to MQTT"), useSSL: true });
client.onConnectionLost = (responseObject) => console.error("Connection lost:", responseObject.errorMessage);
