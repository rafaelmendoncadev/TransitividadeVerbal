var express = require('express');
var questions = require('../data/questions');
var gabarito = require('../data/gabarito');

var router = express.Router();

function shuffle(array) {
  var copy = array.slice();
  for (var i = copy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function sanitizeQuestion(question) {
  return {
    id: question.id,
    type: question.type,
    prompt: question.prompt,
    sentence: question.sentence,
    highlight: question.highlight,
    options: question.options
  };
}

router.get('/quiz', function(req, res) {
  var count = parseInt(req.query.count, 10) || 5;
  count = Math.min(Math.max(count, 1), questions.length);
  var selected = shuffle(questions).slice(0, count);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json({ questions: selected.map(sanitizeQuestion) });
});

router.post('/quiz/check', function(req, res) {
  var answers = req.body.answers;
  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: 'Respostas inválidas.' });
  }

  var questionMap = {};
  questions.forEach(function(q) {
    questionMap[q.id] = q;
  });

  var results = [];
  var score = 0;

  answers.forEach(function(answer) {
    var question = questionMap[answer.id];
    if (!question) {
      results.push({
        id: answer.id,
        correct: false,
        selected: answer.selected,
        correctAnswer: null,
        explanation: 'Questão não encontrada.',
        distractorExplanation: null
      });
      return;
    }

    var isCorrect = answer.selected === question.correct;
    if (isCorrect) score++;

    var distractorExplanation = null;
    if (!isCorrect && question.distractorExplanations) {
      distractorExplanation = question.distractorExplanations[answer.selected] || null;
    }

    results.push({
      id: question.id,
      correct: isCorrect,
      selected: answer.selected,
      correctAnswer: question.correct,
      explanation: question.explanation,
      distractorExplanation: distractorExplanation
    });
  });

  var allCorrect = results.length > 0 && score === results.length && score === answers.length;

  var payload = {
    results: results,
    score: score,
    total: answers.length,
    allCorrect: allCorrect
  };

  if (allCorrect) {
    payload.gabarito = gabarito;
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json(payload);
});

module.exports = router;
