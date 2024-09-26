document.getElementById('addFlightButton').addEventListener('click', addFlightStrip);

// Function to display the current time
function updateTime() {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0]; // Format: hh:mm:ss
    document.getElementById('timeDisplay').textContent = timeString;
}

// Function to add a flight strip
function addFlightStrip() {
    const stripsContainer = document.getElementById('stripsContainer');

    // Create a new flight strip
    const stripDiv = document.createElement('div');
    stripDiv.className = 'strip';

    // Create input fields for aircraft name and time of departure
    const aircraftNameInput = document.createElement('input');
    aircraftNameInput.placeholder = 'Aircraft Name';

    const departureTimeInput = document.createElement('input');
    departureTimeInput.placeholder = 'Time of Departure';

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerText = 'Trash';
    removeButton.addEventListener('click', () => {
        stripsContainer.removeChild(stripDiv);
    });

    // Append elements to the strip
    stripDiv.appendChild(aircraftNameInput);
    stripDiv.appendChild(departureTimeInput);
    stripDiv.appendChild(removeButton);

    // Add the strip to the container
    stripsContainer.appendChild(stripDiv);

    // Add the aircraft name to the next flights container
    addNextFlight(aircraftNameInput);
}

// Function to add the next flight to the list
function addNextFlight(input) {
    const nextFlightsContainer = document.getElementById('nextFlightsContainer');
    const flightName = input.value || 'Unnamed Flight'; // Default name if empty
    const flightElement = document.createElement('div');

    flightElement.textContent = flightName;

    // Ensure the container holds only the last 7 flights
    if (nextFlightsContainer.children.length >= 7) {
        nextFlightsContainer.removeChild(nextFlightsContainer.firstChild);
    }
    
    nextFlightsContainer.appendChild(flightElement);
    
    // Update the input's event listener to update the flight name in the next flights box
    input.addEventListener('input', () => {
        flightElement.textContent = input.value || 'Unnamed Flight';
    });
}

// Update the time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call
