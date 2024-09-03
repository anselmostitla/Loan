// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./MyToken.sol";

contract Loan is MyToken {
    MyToken public myToken;

    constructor(address _myToken){
        myToken = MyToken(_myToken);
    }

    function takeLoan() public {
        myToken.transferFrom(msg.sender, address(this), 3000000000);
    }
}
