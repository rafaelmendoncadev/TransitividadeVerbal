(function () {
  'use strict';

  var STORAGE_KEY = 'gabaritoUnlocked';
  var STORAGE_DATA_KEY = 'gabaritoData';

  var state = {
    questions: [],
    answers: {},
    phase: 'idle',
    gabaritoUnlocked: false,
    gabaritoData: null
  };

  var els = {};

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    els.intro = document.getElementById('quiz-intro');
    els.panel = document.getElementById('quiz-panel');
    els.questions = document.getElementById('quiz-questions');
    els.counter = document.getElementById('quiz-counter');
    els.banner = document.getElementById('quiz-banner');
    els.btnStart = document.getElementById('btn-start-quiz');
    els.btnCheck = document.getElementById('btn-check-quiz');
    els.btnRetry = document.getElementById('btn-retry-quiz');
    els.btnNew = document.getElementById('btn-new-challenge');
    els.progressFill = document.getElementById('quiz-progress-fill');
    els.progressLabel = document.getElementById('quiz-progress-label');
    els.gabaritoLocked = document.getElementById('gabarito-locked');
    els.gabaritoContent = document.getElementById('gabarito-content');
    els.gabaritoEx1 = document.getElementById('gabarito-ex1');
    els.gabaritoEx2 = document.getElementById('gabarito-ex2');

    els.btnStart.addEventListener('click', startQuiz);
    els.btnCheck.addEventListener('click', checkAnswers);
    els.btnRetry.addEventListener('click', startQuiz);
    els.btnNew.addEventListener('click', startQuiz);

    restoreGabaritoSession();
    setupNavHighlight();
  }

  function setupNavHighlight() {
    var links = document.querySelectorAll('.site-nav__link, .sidebar__link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        if (link.classList.contains('site-nav__link')) {
          document.querySelectorAll('.site-nav__link').forEach(function (l) {
            l.classList.remove('site-nav__link--active');
          });
          link.classList.add('site-nav__link--active');
        }
      });
    });
  }

  function restoreGabaritoSession() {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      var saved = sessionStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        try {
          unlockGabarito(JSON.parse(saved));
        } catch (e) {
          sessionStorage.removeItem(STORAGE_KEY);
          sessionStorage.removeItem(STORAGE_DATA_KEY);
        }
      }
    }
  }

  function updateProgress(answered, total) {
    var pct = total ? Math.round((answered / total) * 100) : 0;
    els.progressFill.style.width = pct + '%';
    els.progressLabel.textContent = state.phase === 'success'
      ? 'Desafio concluído!'
      : 'Progresso: ' + answered + '/' + total;
  }

  function startQuiz() {
    state.answers = {};
    state.phase = 'answering';
    els.banner.innerHTML = '';
    els.btnCheck.classList.remove('hidden');
    els.btnCheck.disabled = false;
    els.btnRetry.classList.add('hidden');
    els.btnNew.classList.add('hidden');

    fetch('/api/quiz?count=5')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        state.questions = data.questions || [];
        renderQuestions();
        els.intro.classList.add('hidden');
        els.panel.classList.add('quiz-panel--active');
        updateProgress(0, state.questions.length);
        document.getElementById('exercicios').scrollIntoView({ behavior: 'smooth' });
      })
      .catch(function () {
        alert('Não foi possível carregar as questões. Tente novamente.');
      });
  }

  function renderQuestions() {
    els.questions.innerHTML = '';
    state.questions.forEach(function (q, index) {
      var card = document.createElement('article');
      card.className = 'quiz-card';
      card.dataset.id = q.id;

      var header = document.createElement('div');
      header.className = 'quiz-card__header';

      var num = document.createElement('span');
      num.className = 'quiz-card__number';
      num.textContent = index + 1;

      var statusOk = document.createElement('span');
      statusOk.className = 'quiz-card__status quiz-card__status--ok';
      statusOk.textContent = '✓';

      var statusErr = document.createElement('span');
      statusErr.className = 'quiz-card__status quiz-card__status--err';
      statusErr.textContent = '✗';

      var prompt = document.createElement('p');
      prompt.className = 'quiz-card__prompt';
      prompt.textContent = q.prompt;

      header.appendChild(num);
      header.appendChild(statusOk);
      header.appendChild(statusErr);
      header.appendChild(prompt);
      card.appendChild(header);

      if (q.sentence) {
        var sentence = document.createElement('p');
        sentence.className = 'quiz-card__sentence';
        if (q.highlight) {
          var parts = q.sentence.split(q.highlight);
          sentence.appendChild(document.createTextNode(parts[0]));
          var strong = document.createElement('strong');
          strong.className = 'verb-highlight';
          strong.textContent = q.highlight;
          sentence.appendChild(strong);
          if (parts[1]) sentence.appendChild(document.createTextNode(parts[1]));
        } else {
          sentence.textContent = q.sentence;
        }
        card.appendChild(sentence);
      }

      var options = document.createElement('div');
      options.className = 'quiz-options';

      (q.options || []).forEach(function (opt) {
        var label = document.createElement('label');
        label.className = 'quiz-option';

        var input = document.createElement('input');
        input.type = 'radio';
        input.name = 'q-' + q.id;
        input.value = opt;

        input.addEventListener('change', function () {
          state.answers[q.id] = opt;
          options.querySelectorAll('.quiz-option').forEach(function (o) {
            o.classList.remove('quiz-option--selected');
          });
          label.classList.add('quiz-option--selected');
          updateProgress(Object.keys(state.answers).length, state.questions.length);
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(' ' + opt));
        options.appendChild(label);
      });

      card.appendChild(options);

      var feedback = document.createElement('div');
      feedback.className = 'quiz-feedback';
      card.appendChild(feedback);

      els.questions.appendChild(card);
    });

    els.counter.textContent = 'Responda às ' + state.questions.length + ' questões';
  }

  function checkAnswers() {
    if (state.questions.length === 0) return;

    var payload = state.questions.map(function (q) {
      return { id: q.id, selected: state.answers[q.id] || '' };
    });

    var unanswered = payload.filter(function (a) { return !a.selected; });
    if (unanswered.length > 0) {
      alert('Responda todas as ' + state.questions.length + ' questões antes de verificar.');
      return;
    }

    els.btnCheck.disabled = true;

    fetch('/api/quiz/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: payload })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        applyResults(data);
      })
      .catch(function () {
        alert('Erro ao verificar respostas. Tente novamente.');
        els.btnCheck.disabled = false;
      });
  }

  function applyResults(data) {
    state.phase = data.allCorrect ? 'success' : 'reviewed';

    data.results.forEach(function (result) {
      var card = els.questions.querySelector('[data-id="' + result.id + '"]');
      if (!card) return;

      card.classList.add('quiz-card--reviewed');
      card.classList.add(result.correct ? 'quiz-card--correct' : 'quiz-card--incorrect');

      var options = card.querySelectorAll('.quiz-option');
      options.forEach(function (opt) {
        opt.classList.add('quiz-option--disabled');
        var input = opt.querySelector('input');
        if (input.value === result.correctAnswer) {
          opt.classList.add('quiz-option--correct');
        }
        if (input.checked && !result.correct) {
          opt.classList.add('quiz-option--wrong');
        }
      });

      var feedback = card.querySelector('.quiz-feedback');
      feedback.classList.add(result.correct ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect');

      var html = '<p class="quiz-feedback__title">' +
        (result.correct ? 'Correto!' : 'Incorreto') + '</p>';
      html += '<p>' + escapeHtml(result.explanation) + '</p>';
      if (!result.correct && result.distractorExplanation) {
        html += '<p><strong>Por que sua resposta está errada:</strong> ' +
          escapeHtml(result.distractorExplanation) + '</p>';
      }
      if (!result.correct) {
        html += '<p><strong>Resposta correta:</strong> ' +
          escapeHtml(result.correctAnswer) + '</p>';
      }
      feedback.innerHTML = html;
    });

    els.btnCheck.classList.add('hidden');

    if (data.allCorrect) {
      els.banner.innerHTML =
        '<div class="banner banner--success">' +
        '<p class="banner__title">Parabéns! Você acertou todas as 5 questões!</p>' +
        '<p>O gabarito completo dos exercícios do PDF foi desbloqueado abaixo.</p>' +
        '</div>';
      els.btnNew.classList.remove('hidden');
      updateProgress(data.total, data.total);

      if (data.gabarito) {
        unlockGabarito(data.gabarito);
        sessionStorage.setItem(STORAGE_KEY, 'true');
        sessionStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data.gabarito));
      }
    } else {
      els.banner.innerHTML =
        '<div class="banner banner--error">' +
        '<p class="banner__title">Revise as explicações e tente novamente</p>' +
        '<p>Você acertou ' + data.score + ' de ' + data.total +
        '. É necessário acertar todas sem erro para desbloquear o gabarito.</p>' +
        '</div>';
      els.btnRetry.classList.remove('hidden');
      updateProgress(data.score, data.total);
    }
  }

  function unlockGabarito(gabarito) {
    state.gabaritoUnlocked = true;
    state.gabaritoData = gabarito;

    els.gabaritoLocked.classList.add('hidden');
    els.gabaritoContent.classList.add('gabarito-content--visible');

    renderGabaritoBlock(els.gabaritoEx1, gabarito.exercicio1, true);
    renderGabaritoBlock(els.gabaritoEx2, gabarito.exercicio2, false);
  }

  function renderGabaritoBlock(container, block, showClassificacao) {
    var html = '<h3 class="gabarito-block__title">' + escapeHtml(block.titulo) + '</h3>';
    html += '<p class="gabarito-block__instrucao">' + escapeHtml(block.instrucao) + '</p>';
    html += '<ol class="gabarito-list">';

    block.itens.forEach(function (item) {
      html += '<li class="gabarito-item">';
      html += '<span class="gabarito-item__num">' + item.item + '.</span>';
      html += '<span class="gabarito-item__frase">' + escapeHtml(item.frase) + '</span>';
      html += '<span class="gabarito-item__resposta">';
      if (showClassificacao) {
        html += '<strong>' + escapeHtml(item.classificacao) + '</strong>';
        if (item.complementos) {
          html += ' — ' + escapeHtml(item.complementos);
        }
      } else {
        html += '<strong>' + escapeHtml(item.resposta) + '</strong>';
      }
      html += '</span></li>';
    });

    html += '</ol>';
    container.innerHTML = html;
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
