function requestcalculatereturn() { //function requesting on flask server

    const principal_amount = document.getElementById("principal_amount").value;
    const ticker = document.getElementById("ticker").value;
    const num_years = document.getElementById("num_years").value;
    // beta not needed 
    const url = `http://127.0.0.1:5000/calculate?principal_amount=${principal_amount}&ticker=${ticker}&num_years=${num_years}`;
    // url that I used from pycalc.py, kind of like f string
    
    axios.get(url)
    .then(response => {
        // Only check for investment_return and display it
        if (response.data.investment_return) {
            document.getElementById("Investment Result Placement").innerText = `Investment Return: ${response.data.investment_return}`;
        }
    });

    // The following axios request is commented out
    /*
    axios.get(url)
        .then(response => {
            if (response.data.investment_return) {
                document.getElementById("Investment Result Placement").innerText = `Investment Return: ${response.data.investment_return}`;
            } else if (response.data.error) {
                document.getElementById("Investment Result Placement").innerText = `Error: ${response.data.error}`;
            }
        });
    */
}
        