pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/CappedToken.sol";


/**
 * @title Artist token
 * @dev Mintable token with a token cap.
 */
contract ArtistToken is CappedToken {

  string public constant name = "Tiga Coin"; // solium-disable-line uppercase
  string public constant symbol = "TIGA"; // solium-disable-line uppercase
  uint8 public constant decimals = 18; // solium-disable-line uppercase

  uint256 public cap = 10000000 * (10 ** uint256(decimals));

  /**
   * @dev Constructor.
   */
  function ArtistToken() CappedToken(cap) public { }

}
