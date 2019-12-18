import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosWithAuth from '../axios';

const quotesURL = 'http://localhost:5000/api/quotes';

const validate = ({ text, author }) => {
  return {};
};

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteId, setCurrentQuoteId] = useState(null);

  const getAllQuotes = () => {
    // 1- We need to fetch all quotes making a [GET
    // request to the quotesURL. On success we should
    // put the quotes inside the `quotes` slice of state.

    axiosWithAuth().get('http://localhost:5000/api/quotes')
      .then(response => {
        setQuotes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    // 2- Mmmm. What should happen in here?
    getAllQuotes();
  }, []);

  const getCurrentQuote = () => {
    // 3- We need a utility function that can look at the
    // `currentQuoteId` and fish out the complete quote
    // object from the `quotes` slice of state
    return quotes.find(quote => quote.id === currentQuoteId);
  };

  const updateQuote = ({ id, text, author }) => {
    // 4- we need to hit the quotesURL with a PUT request.
    // the id of the quote that needs replacing will go
    // at the end of the url (don't forget the forward slash)
    // The payload of the request will be both `text` and `author`.
    // On success we should make the form disappear and fetch all quotes.
  };

  const deleteQuote = (id) => {
    // 5- we need to hit the quotesURL with a DELETE request.
    // the id of the quote that needs deleting will go
    // at the end of the url (don't forget the forward slash)
    // On success we should fetch all quotes.
  };

  return (
    <div className='quotes'>
      <ul>
        {
          quotes.map(q => (
            <li key={q.id}>
              <div>{q.text} ({q.author})</div>
              <button onClick={() => setCurrentQuoteId(q.id)}>edit</button>
              <button onClick={() => deleteQuote(q.id)}>del</button>
            </li>
          ))
        }
      </ul>
      {
        currentQuoteId &&
        <Formik
          // 6- Mmm. we need a special prop to re-mount the Formik
          // component whenever the `currentQuoteId` changes
          key={currentQuoteId}
          // 7- We need some validation so the form can't go out empty.
          validate={validate}
          initialValues={{
            text: getCurrentQuote().text,
            author: getCurrentQuote().author,
          }}
          onSubmit={({ text, author }) => {
            updateQuote({
              id: currentQuoteId,
              text,
              author,
            });
          }}
          render={() => (
            <Form>
              <Field name='text' />
              <ErrorMessage name='text' component='span' />

              <Field name='author' />
              <ErrorMessage name='author' component='span' />

              <input type='submit' />
            </Form>
          )}
        />
      }
    </div>
  );
}
