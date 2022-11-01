const Complaint = artifacts.require("Complaint");

module.exports = function(deployer) {
  deployer.deploy(Complaint);
};
