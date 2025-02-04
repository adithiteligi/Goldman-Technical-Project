Mutual Fund Investment Estimator

Overview

This web application helps users estimate potential returns on their mutual fund investments. Users can select a mutual fund ticker, input an initial investment amount, and specify an investment duration to calculate the future value of their investment.


Web App Features
* Estimate Future Returns: Uses the Capital Asset Pricing Model (CAPM) to project investment growth.
* Mutual Fund Data: Fetches real-time beta values and market returns.
* User-Friendly Interface: Dropdown selection, input fields, and visualized results.
* Backend API Integration: RESTful services fetch financial data from external APIs.

Data Sources
* Risk-Free Rate: US Treasury Rate
* Market Return: S&P 500 Historical Data
* Beta Values: Newton Analytics API
  
Tech Stack
* Frontend: React
* Backend: Python, Axios
* APIs: FRED (S&P 500 returns), Newton Analytics (Beta values)
