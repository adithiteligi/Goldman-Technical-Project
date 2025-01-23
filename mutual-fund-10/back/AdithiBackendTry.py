from flask import Flask, request, jsonify
import requests
import math

app = Flask(__name__)

# hardcoded list of mutual funds
MUTUAL_FUNDS = [
    {"ticker": "VSMPX", "name": "Vanguard Total Stock Market Index Fund; Institutional Plus"},
    {"ticker": "FXAIX", "name": "Fidelity 500 Index Fund"},
    {"ticker": "VFIAX", "name": "Vanguard 500 Index Fund; Admiral"},
    {"ticker": "VTSAX", "name": "Vanguard Total Stock Market Index Fund; Admiral"},
    {"ticker": "SPAXX", "name": "Fidelity Government Money Market Fund"},
    {"ticker": "VMFXX", "name": "Vanguard Federal Money Market Fund; Investor"},
    {"ticker": "FDRXX", "name": "Fidelity Government Cash Reserves"},
    {"ticker": "FGTXX", "name": "Goldman Sachs FS Government Fund; Institutional"},
    {"ticker": "SWVXX", "name": "Schwab Value Advantage Money Fund; Investor"},
    {"ticker": "VGTSX", "name": "Vanguard Total International Stock Index Fund; Investor"},
    {"ticker": "VFFSX", "name": "Vanguard 500 Index Fund; Institutional Select"},
    {"ticker": "VIIIX", "name": "Vanguard Institutional Index Fund; Inst Plus"},
    {"ticker": "OGVXX", "name": "JPMorgan US Government Money Market Fund; Capital"},
    {"ticker": "MVRXX", "name": "Morgan Stanley Inst Liq Government Port; Institutional"},
    {"ticker": "VTBNX", "name": "Vanguard Total Bond Market II Index Fund; Institutional"},
    {"ticker": "TFDXX", "name": "BlackRock Liquidity FedFund; Institutional"},
    {"ticker": "FRGXX", "name": "Fidelity Instl Government Portfolio; Institutional"},
    {"ticker": "TTTXX", "name": "BlackRock Liquidity Treasury Trust Fund; Institutional"},
    {"ticker": "AGTHX", "name": "American Funds Growth Fund of America; A"},
    {"ticker": "VTBIX", "name": "Vanguard Total Bond Market II Index Fund; Investor"},
    {"ticker": "GVMXX", "name": "State Street US Government Money Market Fund; Prem"},
    {"ticker": "FCTDX", "name": "Fidelity Strategic Advisers Fidelity US Total Stk"},
    {"ticker": "FCNTX", "name": "Fidelity Contrafund"},
    {"ticker": "VINIX", "name": "Vanguard Institutional Index Fund; Institutional"},
    {"ticker": "VMRXX", "name": "Vanguard Cash Reserves Federal Money Market Fd; Adm"},
]

# endpoint to get list of mutual funds
@app.route('/mutual-funds', methods=['GET'])
def get_mutual_funds():
    return jsonify(MUTUAL_FUNDS)

# endpoint to calculate future value of investment
@app.route('/future-value', methods=['GET'])
def get_future_value():
    # Get query parameters
    ticker = request.args.get('ticker')
    initial_amount = float(request.args.get('initial_amount'))
    duration = int(request.args.get('duration'))

    # get beta value for mutual fund
    beta = get_beta(ticker)
    # get market return rate
    market_return_rate = get_market_return_rate()
    # calculate rate using CAPM formula
    rate = RISK_FREE_RATE + beta * (market_return_rate - RISK_FREE_RATE)
    # calculate future value of investment
    future_value = calculate_future_value(initial_amount, rate, duration)

    # return future value as JSON response
    return jsonify({"future_value": future_value})

# function to get beta value for given ticker
def get_beta(ticker):
    url = f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12"
    response = requests.get(url)
    data = response.json()
    return data['beta']

# function to get market return rate
def get_market_return_rate():
    url = "https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json"
    response = requests.get(url)
    data = response.json()
    observations = data['observations']
    first_value = float(observations[0]['value'])
    last_value = float(observations[-1]['value'])
    return (last_value - first_value) / first_value

# function to calculate future value of investment
def calculate_future_value(initial_amount, rate, duration):
    return initial_amount * math.exp(rate * duration)

# run Flask application
if __name__ == '__main__':
    app.run(debug=True)
