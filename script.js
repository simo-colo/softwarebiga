document.getElementById('addFlightButton').addEventListener('click', addFlightStrip);

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
}
