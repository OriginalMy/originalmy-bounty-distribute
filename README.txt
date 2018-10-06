Bounty Distribution process

1) Put the csv file in the folder csv
- csv format: [email],[wallet],[qty]
- If csv has a massive number of lines, break the file in lower ones and send it in many batches.

2) Fund the distribution wallet with tokens
- total of tokens to be distributed

3) Fund the distribution wallet with eth
- Find the best gasPrice on https://etherscan.io/gasTracker
- Calculate the eth qty: (gasPrice * gas) * qty of users
- Default gas: 52649 

4) check if received.json is empty

5) Run ethereum local node

6) Unlock the wallet for the time of distribution (total users * 3 secs)

7) Start the distribution:
# node app.js ./csv/<csv_file.csv>



Stop the distribution
- Open config.json 
- change status: 'stop': true