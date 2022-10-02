// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;

contract Edits{
    uint editCount = 0;

    struct Edit {
        uint id;
        uint datetime;
        string author;
        string content;
    }

    mapping(uint => Edit) public edits;

    constructor() public {

    }

}