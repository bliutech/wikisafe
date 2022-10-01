// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Edits{
    uint editCount = 0;

    struct Edit {
        uint id;
        uint datetime;
        string author;
        string content;
    }

    mapping(uint => Edit) public edits;

    constructor() {}

}