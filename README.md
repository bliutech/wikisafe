# 📕 Wikisafe 📕

<img width="1141" alt="image" src="https://user-images.githubusercontent.com/67720812/193449380-4fcea915-08f8-4121-8951-09c16428f45f.png">

Wikisafe is a revolutionary new crowdsourcing web application that innovates the process of crowdsourcing information. This application leverages the Ethereum blockchain to validate contributions to crowdsourced articles and prevents vandalism to these vital resources. Additionally, Wikisafe provides several fidelity machine learning models that seek to improve the overall contributor experience through automating parts of the process such as summarization, captioning, and figure generation. Contributors can start simply by signing up for an account and begin contributing and utilizing the features. Communities are able to collectively share knowledge and improve free and accessible education globally around the world with incredible ease, security, and quality!

See Wikisafe live at [http://54.215.107.134:8000/](http://54.215.107.134:8000/).

Developed for [HackMIT 2022](https://hackmit.org/).

## 📝Authors 📝
Wikisafe  was made for HackMIT 2022, by Team **PB & J & J**&mdash;Prateik Sinha, Benson Liu, Jeffrey Kwan, and Jordan Lin.

## 💻 Languages & Tools 💻

OrganSafe was developed using the following technlogies:
- JavaScript <img src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png" alt="javascript logo" width="30px"/>
- React.js <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="react.js logo" width="30px"/>
- Python <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" alt="python logo" width="30px"/>
- Flask <img src="https://miro.medium.com/max/438/1*0G5zu7CnXdMT9pGbYUTQLQ.png" alt="flask logo" height="30px"/>
- PyTorch <img src="https://pytorch.org/assets/images/pytorch-logo.png" height="30px"/>
- Solidity <img src="https://www.logosvgpng.com/wp-content/uploads/2018/10/solidity-logo-vector.png" alt="solidity logo" width="50px"/>
- Ethereum Blockchain <img src="https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg" alt="ethereum logo" width="30px"/>

## 🔨 Setup 🔨

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

## ℹ Linting ℹ
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
