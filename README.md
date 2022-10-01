# WikiSafe

Project for HackMIT 2022, made with &#10084; by Team **PB & J & J**&mdash;Prateik Siahi, Benson Liu, Jeffrey Kwan, and Jordan Lin.

## Setup

To install the client application, run the following commands.

```
cd client
npm i
npm start
```

To install the server application, run the following commands.
```
cd server
virtualenv venv --python=3.9
source venv/bin/activate
pip install -r requirements.txt
```

## Linting
This project supports CI/CD for linting. For the server application, utilize black for linting. To check if any formatting changes need to be made, run the following.

```
python -m black --check *.py
```

To resolve any needed changes run
```
python -m black *.py
```

For the client application, utilize prettier for linting. To check if any formatting changes need to be made, run the following.

```
npm run check
```

To resolve any needed changes run
```
npm run fix
```