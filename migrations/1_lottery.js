var MyContract = artifacts.require("./lottery.sol");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
