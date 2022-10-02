var Articles = artifacts.require("./Articles.sol");

module.exports = function(deployer) {
  deployer.deploy(Articles);
};
