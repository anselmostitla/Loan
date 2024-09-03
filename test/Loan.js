const {
   time,
   loadFixture,
 } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
 const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
 const { expect } = require("chai");

describe("Test1", function(){
   async function deployLoan(){
      // Contracts are deployed using the first signer/account by default
      const [owner, user1, user2] = await ethers.getSigners();

      const MyToken = await ethers.getContractFactory("MyToken");
      const myToken = await MyToken.deploy();
      console.log(myToken.target);

      const Loan = await ethers.getContractFactory("Loan");
      const loan = await Loan.deploy(myToken.target);
      console.log(loan.target);
  
      return { owner, user1, user2,  myToken, loan};
   }

   describe("Test1", function(){
      it("test_1a", async function(){
         const { owner, user1, user2,  myToken, loan } = await loadFixture(deployLoan);
         await myToken.mint(user1, 3000000000)
         console.log("user1 balance: ", await myToken.balanceOf(user1));
         
         await myToken.connect(user1).approve(loan.target, 3000000000)
         console.log("Allowance: ", await myToken.allowance(user1.address, loan.target));

         await loan.connect(user1).takeLoan()
         console.log("user1 balance: ", await myToken.balanceOf(user1.address));
         console.log("loan balance: ", await myToken.balanceOf(loan.target));

      })
   })
})