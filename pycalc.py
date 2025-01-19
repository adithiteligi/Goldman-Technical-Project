
from flask import Flask, request, jsonify
import requests
import math

app = Flask(__name__)

#risk free rate 
def risk_free_rate_pull():
    #my personal api key from fred website
    api_key = '271951fe18d7cf4c3fda2384bf49aae3'
    url = f'https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key={api_key}&file_type=json'
    from_api = requests.get(url).json()
    risk_free_rate = (float(from_api['observations'][-1]['value']) / 100)
    return risk_free_rate

#S&P Market Average 

def avg_market_return_pull():
    api_key = 'd26079fc190512773ac705629a92f8ea'
    url = f'https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key={api_key}&file_type=json'
    from_api = requests.get(url).json()
    
    observations = from_api['observations']
    returns = []
    
    for i in range(1, len(observations)):
        previous_value = float(observations[i - 1]['value'])
        current_value = float(observations[i]['value'])
        
        period_return = (current_value - previous_value) / previous_value
        
        returns.append(period_return)
    
    total_return = sum(returns)
    number_of_returns = len(returns)
    avg_market_return = total_return / number_of_returns if number_of_returns > 0 else 0

    return avg_market_return

#CAPM
def calculate_final_rate_return(risk_free_rate, beta, market_return):
   
    return risk_free_rate + beta * (market_return - risk_free_rate)

#Final Equation as seen on NovoED
def calculate_investment_return(principal_amount, risk_free_rate, beta, market_return, num_years):
   
    final_rate_return = calculate_final_rate_return(risk_free_rate, beta, market_return)
    
    return principal_amount * math.exp(final_rate_return * num_years)


@app.route('/')
def home():
    return "Calculator API is Active!"

if __name__ == '__main__':
    app.run(debug=True)


