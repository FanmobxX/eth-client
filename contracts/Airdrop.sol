/*
Copyright 2017 OmiseGO Pte Ltd, Shane Vitarana

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

pragma solidity ^0.4.18;

import "./Ownable.sol";
import "./CappedToken.sol";

contract Airdrop is Ownable {
  function multisend(
    address tokenAddr, 
    address[] dests, 
    uint256 value) public onlyOwner returns (uint256) {

      uint256 i = 0;
      while (i < dests.length) {
        CappedToken(tokenAddr).mint(dests[i], value);
        i += 1;
      }
      return(i);
  }
}
