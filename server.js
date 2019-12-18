const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

let quotes = [
  {
    id: uuid(),
    author: 'Dr. Seuss',
    text: "Don't cry because it's over, smile because it happened.",
  },
  {
    id: uuid(),
    author: 'Frank Zappa',
    text: "So many books, so little time.",
  },
  {
    id: uuid(),
    author: 'Oscar Wilde',
    text: "Be yourself; everyone else is already taken.",
  },
  {
    id: uuid(),
    author: 'Albert Einstein',
    text: "A question that drives me hazy — am I or are the others crazy?",
  },
];

function getAllQuotes(req, res) {
  res.json(quotes);
}

function getQuoteById(req, res) {
  res.json(quotes.find(friend => friend.id === req.params.id));
}

function postNewQuote(req, res) {
  const quote = { id: uuid(), ...req.body };
  quotes.push(quote);
  res.json(quote);
}

function deleteQuoteById(req, res) {
  quotes = quotes.filter(friend => friend.id !== req.params.id);
  res.json(req.params.id);
}

function replaceQuoteById(req, res) {
  quotes = quotes.map(quote => {
    if (quote.id !== req.params.id) return quote;
    return { ...quote, ...req.body };
  });
  res.json(quotes.find(q => q.id === req.params.id));
}

function login(req, res) {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ userId: 'abcd' }, 'shhhhh');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'No idea who you are'});
  }
}

function authCheck(req, res, next) {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, 'shhhhh');
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

// endpoint to exchange valid credentials for token
app.post('/login', login);

// endpoints that require valid token to work
app.get('/api/quotes', authCheck, getAllQuotes); // no body, no id
app.get('/api/quotes/:id', authCheck, getQuoteById); // no body, yes id
app.post('/api/quotes', authCheck, postNewQuote); // yes body, no id
app.delete('/api/quotes/:id', authCheck, deleteQuoteById); // no body, yes id
app.put('/api/quotes/:id', authCheck, replaceQuoteById); // yes body, yes id

app.listen(5000, () => console.log(
  'Quotes server listening on port 5000!',
));
