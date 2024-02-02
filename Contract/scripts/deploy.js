const hre = require("hardhat");

async function main() {
  const entityName = "Ray"
  const entityAge = 21

  const SimpleRegistry = await hre.ethers.deployContract("SimpleRegistry", [
    entityName,
    entityAge
  ])

  await SimpleRegistry.waitForDeployment();

  console.log(`Registry has been deployed to: ${SimpleRegistry.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
