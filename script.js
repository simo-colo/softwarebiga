document.getElementById('addFlightButton').addEventListener('click', addFlightStrip);

// Load existing flight strips from local storage when the page is loaded
window.addEventListener('load', () => {
    loadStrips();
    fetchMETAR(); // Fetch QNH when the page loads
});

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

    // Add blur event listeners to save data on exit
    aircraftNameInput.addEventListener('blur', saveStrips);
    departureTimeInput.addEventListener('blur', saveStrips);

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerText = 'Trash';
    removeButton.addEventListener('click', () => {
        stripsContainer.removeChild(stripDiv);
        saveStrips(); // Save the updated strips to local storage
    });

    // Append elements to the strip
    stripDiv.appendChild(aircraftNameInput);
    stripDiv.appendChild(departureTimeInput);
    stripDiv.appendChild(removeButton);

    // Add the strip to the container
    stripsContainer.appendChild(stripDiv);

    // Add the aircraft name to the next flights container
    addNextFlight(aircraftNameInput);

    // Save the updated strips to local storage
    saveStrips();
}

// Function to save strips to local storage
function saveStrips() {
    const stripsContainer = document.getElementById('stripsContainer');
    const strips = Array.from(stripsContainer.children).map(strip => {
        const inputs = strip.getElementsByTagName('input');
        return {
            aircraftName: inputs[0].value,
            departureTime: inputs[1].value
        };
    });
    localStorage.setItem('flightStrips', JSON.stringify(strips));
}

// Function to load strips from local storage
function loadStrips() {
    const stripsData = JSON.parse(localStorage.getItem('flightStrips')) || [];
    stripsData.forEach(data => {
        const stripsContainer = document.getElementById('stripsContainer');
        
        const stripDiv = document.createElement('div');
        stripDiv.className = 'strip';

        const aircraftNameInput = document.createElement('input');
        aircraftNameInput.placeholder = 'Aircraft Name';
        aircraftNameInput.value = data.aircraftName;

        const departureTimeInput = document.createElement('input');
        departureTimeInput.placeholder = 'Time of Departure';
        departureTimeInput.value = data.departureTime;

        // Add blur event listeners to save data on exit
        aircraftNameInput.addEventListener('blur', saveStrips);
        departureTimeInput.addEventListener('blur', saveStrips);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.innerText = 'Trash';
        removeButton.addEventListener('click', () => {
            stripsContainer.removeChild(stripDiv);
            saveStrips(); // Save the updated strips to local storage
        });

        stripDiv.appendChild(aircraftNameInput);
        stripDiv.appendChild(departureTimeInput);
        stripDiv.appendChild(removeButton);
        
        stripsContainer.appendChild(stripDiv);
        
        // Add the aircraft name to the next flights container
        addNextFlight(aircraftNameInput);
    });
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

// Function to fetch the QNH value from the METAR
async function fetchMETAR() {
    try {
        const response = await fetch('https://www.aviatorjoe.net/go/wx/LIMC/');
        const text = await response.text();
        
        // Parse the response text to find the QNH
        const metarMatch = text.match(/A(\d{4})|Q(\d{4})/); // Matches A or Q format
        
        if (metarMatch) {
            const qnhValue = metarMatch[1] ? metarMatch[1] : metarMatch[2]; // Get the value
            document.getElementById('qnhValue').textContent = `${qnhValue} hPa`; // Update QNH display
        } else {
            console.log('QNH not found.');
        }
    } catch (error) {
        console.error('Error fetching METAR data:', error);
    }
}

// Update the time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call
