'use strict';

describe('JSONPath - Intermixed Array', function () {
    // tests based on examples at http://goessner.net/articles/jsonpath/
    const json = {
        "store": {
            "book": [
                {
                    "category": "reference",
                    "author": "Nigel Rees",
                    "title": "Sayings of the Century",
                    "price": [8.95, 8.94, 8.93]
                },
                {
                    "category": "fiction",
                    "author": "Evelyn Waugh",
                    "title": "Sword of Honour",
                    "price": 12.99
                },
                {
                    "category": "fiction",
                    "author": "Herman Melville",
                    "title": "Moby Dick",
                    "isbn": "0-553-21311-3",
                    "price": 8.99
                },
                {
                    "category": "fiction",
                    "author": "J. R. R. Tolkien",
                    "title": "The Lord of the Rings",
                    "isbn": "0-395-19395-8",
                    "price": 22.99
                }
            ],
            "bicycle": {
                "color": "red",
                "price": 19.95
            }
        }
    };

    it('all sub properties, entire tree', () => {
        const books = json.store.book;
        let expected = [books[1].price, books[2].price, books[3].price, json.store.bicycle.price];
        expected = books[0].price.concat(expected);
        const result = jsonpath({json, path: '$.store..price', flatten: true});
        assert.deepEqual(expected, result);
    });

    it('all sub properties of single element arr', () => {
        const book = json.store.book[0];
        const input = {book};
        const expected = [book.title];
        const result = jsonpath({json: input, path: '$..title', flatten: true, wrap: false});
        assert.deepEqual(expected, result);
    });
});
