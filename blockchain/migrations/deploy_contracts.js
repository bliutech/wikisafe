var TodoList = artifacts.require("./Articles.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};
