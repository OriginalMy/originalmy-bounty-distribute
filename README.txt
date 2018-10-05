Bounty Distribution process

1) Put the csv file in the folder csv
- csv format: [email],[wallet],[qty]

2) Fund the distribution wallet with tokens
- total of tokens to be distributed

3) Fund the distribution wallet with eth
- Find the best gasPrice on https://etherscan.io/gasTracker
- Calculate the eth qty: (gasPrice * gas) * qty of users
- Default gas: 52649 

4) Run ethereum local node

5) Unlock the wallet

6) Start the distribution:
# node app.js