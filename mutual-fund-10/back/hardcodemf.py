#need to manually extract data from Market Watch 
#choose VSMPX (Vanguard Total Stock Market Index Fund; Institutional Plus)
#use dictionary to incoporate data of Fund Name, current price, Ticker Symbol, 1 year return, 5 year return 
#not fleshed out 

MUTUAL_FUNDS = {
    'VSMPX': {
        'name': 'Vanguard Total Stock Market Index Fund; Institutional Plus',
        'ticker': 'VSMPX',
        'current_price': 270.52,
        '1_year_return': 0.2792,  # in decimal form from percent
        '5_year_return': 0.894  # in decimal form from percent
    },
    'FXAIX': {
        'name': 'Fidelity 500 Index Fund',
        'ticker': 'FXAIX',
        'current_price': 150.34,
        '1_year_return': 0.2567,
        '5_year_return': 0.812
    },
    'VFIAX': {
        'name': 'Vanguard 500 Index Fund; Admiral',
        'ticker': 'VFIAX',
        'current_price': 320.45,
        '1_year_return': 0.2678,
        '5_year_return': 0.845
    },
    'VTSAX': {
        'name': 'Vanguard Total Stock Market Index Fund; Admiral',
        'ticker': 'VTSAX',
        'current_price': 220.12,
        '1_year_return': 0.2789,
        '5_year_return': 0.890
    },
    'SPAXX': {
        'name': 'Fidelity Government Money Market Fund',
        'ticker': 'SPAXX',
        'current_price': 1.00,
        '1_year_return': 0.015,
        '5_year_return': 0.075
    },
    'VMFXX': {
        'name': 'Vanguard Federal Money Market Fund; Investor',
        'ticker': 'VMFXX',
        'current_price': 1.00,
        '1_year_return': 0.014,
        '5_year_return': 0.070
    },
    'FDRXX': {
        'name': 'Fidelity Government Cash Reserves',
        'ticker': 'FDRXX',
        'current_price': 1.00,
        '1_year_return': 0.013,
        '5_year_return': 0.065
    },
    'FGTXX': {
        'name': 'Goldman Sachs FS Government Fund; Institutional',
        'ticker': 'FGTXX',
        'current_price': 1.00,
        '1_year_return': 0.012,
        '5_year_return': 0.060
    },
    'SWVXX': {
        'name': 'Schwab Value Advantage Money Fund; Investor',
        'ticker': 'SWVXX',
        'current_price': 1.00,
        '1_year_return': 0.011,
        '5_year_return': 0.055
    },
    'VGTSX': {
        'name': 'Vanguard Total International Stock Index Fund; Investor',
        'ticker': 'VGTSX',
        'current_price': 120.45,
        '1_year_return': 0.1234,
        '5_year_return': 0.567
    },
    'VFFSX': {
        'name': 'Vanguard 500 Index Fund; Institutional Select',
        'ticker': 'VFFSX',
        'current_price': 340.67,
        '1_year_return': 0.2689,
        '5_year_return': 0.846
    },
    'VIIIX': {
        'name': 'Vanguard Institutional Index Fund; Inst Plus',
        'ticker': 'VIIIX',
        'current_price': 350.78,
        '1_year_return': 0.2690,
        '5_year_return': 0.847
    },
    'OGVXX': {
        'name': 'JPMorgan US Government Money Market Fund; Capital',
        'ticker': 'OGVXX',
        'current_price': 1.00,
        '1_year_return': 0.010,
        '5_year_return': 0.050
    },
    'MVRXX': {
        'name': 'Morgan Stanley Inst Liq Government Port; Institutional',
        'ticker': 'MVRXX',
        'current_price': 1.00,
        '1_year_return': 0.009,
        '5_year_return': 0.045
    },
    'VTBNX': {
        'name': 'Vanguard Total Bond Market II Index Fund; Institutional',
        'ticker': 'VTBNX',
        'current_price': 11.23,
        '1_year_return': 0.0234,
        '5_year_return': 0.117
    },
    'TFDXX': {
        'name': 'BlackRock Liquidity FedFund; Institutional',
        'ticker': 'TFDXX',
        'current_price': 1.00,
        '1_year_return': 0.008,
        '5_year_return': 0.040
    },
    'FRGXX': {
        'name': 'Fidelity Instl Government Portfolio; Institutional',
        'ticker': 'FRGXX',
        'current_price': 1.00,
        '1_year_return': 0.007,
        '5_year_return': 0.035
    },
    'TTTXX': {
        'name': 'BlackRock Liquidity Treasury Trust Fund; Institutional',
        'ticker': 'TTTXX',
        'current_price': 1.00,
        '1_year_return': 0.006,
        '5_year_return': 0.030
    },
    'AGTHX': {
        'name': 'American Funds Growth Fund of America; A',
        'ticker': 'AGTHX',
        'current_price': 55.67,
        '1_year_return': 0.2345,
        '5_year_return': 0.678
    },
    'VTBIX': {
        'name': 'Vanguard Total Bond Market II Index Fund; Investor',
        'ticker': 'VTBIX',
        'current_price': 11.45,
        '1_year_return': 0.0223,
        '5_year_return': 0.112
    },
    'GVMXX': {
        'name': 'State Street US Government Money Market Fund; Prem',
        'ticker': 'GVMXX',
        'current_price': 1.00,
        '1_year_return': 0.005,
        '5_year_return': 0.025
    },
    'FCTDX': {
        'name': 'Fidelity Strategic Advisers Fidelity US Total Stk',
        'ticker': 'FCTDX',
        'current_price': 45.78,
        '1_year_return': 0.2456,
        '5_year_return': 0.789
    },
    'FCNTX': {
        'name': 'Fidelity Contrafund',
        'ticker': 'FCNTX',
        'current_price': 120.34,
        '1_year_return': 0.2345,
        '5_year_return': 0.678
    },
    'VINIX': {
        'name': 'Vanguard Institutional Index Fund; Institutional',
        'ticker': 'VINIX',
        'current_price': 350.12,
        '1_year_return': 0.2691,
        '5_year_return': 0.848
    },
    'VMRXX': {
        'name': 'Vanguard Cash Reserves Federal Money Market Fd; Adm',
        'ticker': 'VMRXX',
        'current_price': 1.00,
        '1_year_return': 0.004,
        '5_year_return': 0.020
    }
}

'''
Vanguard_mutual =  {
    'Vanguard Total Stock Market Index Fund': {
        'ticker': 'VSMPX',
        'current price' : 270.52 ,
        '1_year_return': 0.2792,  #in decimal form from percent
        '5_year_return': 0.894 #in decimal form from percent
    }
}
'''
# Just leaving ^ here in case
