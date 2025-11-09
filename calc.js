const time = document.getElementById('time');

function currentTime() {
    const current = new Date();
    const style = {
      hour: "2-digit",
      minute: "2-digit",
    };

    time.textContent = current.toLocaleTimeString([], style);
    time.dateTime = current.toISIString();
}

setInterval(currentTime, 1000);

currentTime();