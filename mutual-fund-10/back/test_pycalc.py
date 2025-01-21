import unittest
from pycalc import app

class TestCalculatorAPI(unittest.TestCase):
    def setUp(self):
        # create test for flask - references instance
        self.app = app.test_client()
        self.app.testing = True

    # test the calculate w/ valid parameter
    def test_calculate_valid(self):
        params = {
            'principal_amount': 1000.0,
            'beta': 1.2,#set as constant
            'num_years': 5 #set as constant
        }
        response = self.app.get('/calculate', query_string=params)
        self.assertEqual(response.status_code, 200) #confirms 200 status
        self.assertIn(b'investment_return', response.data) #confirms contains 'investment_return'in data
        #b = byte format 
        #f = string format

    # test calculate w/ missing parameters
    def test_calculate_missing_params(self):
        response = self.app.get('/calculate', query_string={'principal_amount': 1000})
        self.assertEqual(response.status_code, 400) #confirms 400 status 
        self.assertIn(b'error', response.data)

    # test  calculate with invalid parameters
    def test_calculate_invalid_params(self):
        params = {
            'principal_amount': 'wrong',
            'beta': 1.2, #set as constant
            'num_years': 5 #set as constant
        }
        response = self.app.get('/calculate', query_string=params)
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'error', response.data)

if __name__ == '__main__':
    unittest.main()
