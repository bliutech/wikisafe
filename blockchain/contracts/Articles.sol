// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

contract Articles {
    uint public articleCount = 0;

    struct Article {
        uint id;
        uint datetime;
        string author;
        string content;
    }

    mapping(uint => Article) public articles;
    // Article[] public articles;

    event ArticleCreated(
        uint id,
        uint datetime,
        string author,
        string content,
        string value
    );

    constructor() public {
        createArticle(100, "Benson", "# hello world");
        // createArticle(1000, "alskdj", "# hello asdl;kasjld");
        // createArticle(1200, "asdasdalskdj", "# hello asdl;kasjldasdasd");
    }

    function createArticle(uint _datetime, string memory _author, string memory _content) public {
        articleCount++;
        articles[articleCount] = Article(articleCount, _datetime, _author, _content);
        emit ArticleCreated(articleCount, _datetime, _author, _content, articles[articleCount].content);
    }
}