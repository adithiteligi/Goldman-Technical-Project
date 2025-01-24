function requestcalculatereturn() { //function requesting on flask server

    const principal_amount = document.getElementById("principal_amount").value;
    const ticker = document.getElementById("ticker").value;
    const num_years = document.getElementById("num_years").value;

    const url = `http://127.0.0.1:5000/calculate?principal_amount=${principal_amount}&ticker=${ticker}&num_years=${num_years}`;
    // url that I used from pycalc.py, kind of like f string
    
    axios.get(url)
    .then(response => {
        // Only parses json
        if (response.data['Investment Return']) { // if the investment return key exits then send the data to dom via html 
            document.getElementById("Investment Result Placement").innerText = `
        Principal Amount: ${response.data['Principal Amount']}
        Time Horizon (Years): ${response.data['Time Horizon']}
        Market Return: ${response.data['Return Rate']}
        Risk Free Rate: ${response.data['Risk Free Rate']}
        Beta: ${response.data['Mutual Fund Beta']}
        Earnings: ${response.data['Earnings']}
        Investment Return: ${response.data['Investment Return']}
        `;
        }
    })
    .catch(error => {
        // Handle errors if the request fails
        document.getElementById("Investment Result Placement").innerText = `Error: ${error}`;
    });
}
