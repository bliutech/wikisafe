// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Articles {
    uint public articleCount = 0;

    struct Article {
        uint id;
        uint datetime;
        string author;
        string content;
    }

    mapping(uint => Article) public articles;

    event ArticleCreated(
        uint id,
        uint datetime,
        string author,
        string content
    );

    constructor() {
        createArticle(100, "Benson", "# hello world");
    }

    function createArticle(uint _datetime, string memory _author, string memory _content) public {
        articleCount++;
        articles[articleCount] = Article(articleCount, _datetime, _author, _content);
        emit ArticleCreated(articleCount, _datetime, _author, _content);
    }
}