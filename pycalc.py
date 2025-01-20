
from flask import Flask, request, jsonify
import requests
import math
#import flask

#create instance
app = Flask(__name__)

#risk free rate 
def risk_free_rate_pull():
    #my personal api key from fred website
    api_key = '271951fe18d7cf4c3fda2384bf49aae3'
    url = f'https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key={api_key}&file_type=json'
    from_api = requests.get(url).json()
    #get recent value
    risk_free_rate = (float(from_api['observations'][-1]['value']) / 100)
    return risk_free_rate

#S&P Market Average 

def avg_market_return_pull():
    api_key = 'd26079fc190512773ac705629a92f8ea' #fred api access (was open)
    url = f'https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key={api_key}&file_type=json' #api endpoint for json/data in dict form
    from_api = requests.get(url).json() #gets data from api
    
    observations = from_api['observations'] #extracts list
    #print(observations) # because of test errors - now error free
    returns = [] #empty list for returns
    
    #loops through observation list
    #gets previous and current values 

    for i in range(1, len(observations)): # loop has to start at 1 there is no -1 element 
        try:
            previous_value = float(observations[i - 1]['value']) # bc observations is a list of dictionaries 
            current_value = float(observations[i]['value'])
        
            period_return = (current_value - previous_value) / previous_value #calculates return 
        
            returns.append(period_return) #append calculated return to list
        except ValueError:
            # error handling for invalid or non-numeric values
            continue
    
    total_return = sum(returns) #adds all returns
    number_of_returns = len(returns) #counts
    avg_market_return = total_return / number_of_returns if number_of_returns > 0 else 0 #gets average and makes sure isnt zero 

    return avg_market_return

#CAPM
def calculate_final_rate_return(risk_free_rate, beta, market_return):
   
    return risk_free_rate + beta * (market_return - risk_free_rate)

#Final Equation as seen on NovoED
def calculate_investment_return(principal_amount, risk_free_rate, beta, market_return, num_years):
   
    final_rate_return = calculate_final_rate_return(risk_free_rate, beta, market_return)
    
    return principal_amount * math.exp(final_rate_return * num_years)

def get_beta(ticker):
    # api url for retrieving beta
    url = f'https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^5eGSPC&interval=1mo&observations=12'
    data = requests.get(url).json()
    if 'data' in data:
        return data['data'] #beta is in data key!!! solition to past errors pulling beta
    else:
        return None  #  beta is not found or the request fails

#decide what logic to execute based on url of request(get)
@app.route('/calculate', methods=['GET'])
def calculate():
    try:
        # gets parameters from the request 
        principal_amount = float(request.args.get('principal_amount'))
        ticker = request.args.get('ticker') #mf ticker from frontend dropdown?
        num_years = int(request.args.get('num_years'))
        beta = get_beta(ticker)
        if beta is None:
            return jsonify({'error': 'Beta not found'}), 404

        # gets risk-free rate and market return
        risk_free_rate = risk_free_rate_pull()
        market_return = avg_market_return_pull()

        # finds the investment return using final NovoED eq
        investment_return = calculate_investment_return(principal_amount, risk_free_rate, beta, market_return, num_years)

        # return as JSON for frontend management
        return jsonify({'investment_return': investment_return})

    except Exception as e:
        # return error 
        return jsonify({'error': str(e)}), 400

@app.route('/')
def home():
    return 'Calculator API is Active!'
#will run when root URL is hit
#pref single quotations

if __name__ == '__main__':
    app.run(debug=True)
#run the app

#for the test code the parameters are passed as a dictionary 
#test link http://127.0.0.1:5000/calculate?principal_amount=10000&ticker=VFIAX&num_years=10
