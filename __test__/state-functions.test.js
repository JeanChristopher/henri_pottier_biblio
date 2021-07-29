/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */

import { RenderBook } from '../src/components/BookDetailComponent'

describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(4);
  });
});

test("RenderParcours does renders the", () => {
    const selectedBook = [{
        "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
        "title": "Henri Potier à l'école des sorciers",
        "price": 35,
        "cover": "https://firebasestorage.googleapis.com/v0/b/henri-potier.appspot.com/o/hp0.jpg?alt=media",
        "synopsis": ["repondu", "Azelle"]
    }
]
    const finState = RenderBook(selectedBook, 1);
  
    expect(finState).toEqual([{ id: 1, done: true, text: "Buy Milk" }]);
  });

