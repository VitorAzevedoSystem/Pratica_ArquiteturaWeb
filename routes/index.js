var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de filmes', docs });
  } catch (err) {
    next(err);
  }
})

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Filme', doc: { "titulo": "", "sinopse": "", "duracao": "", "dataLancamento": "", "imagem": "", "categoria": "" }, action: '/new' });
});

router.post('/new', async (req, res, next) => {
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = req.body.duracao;
  const dataLancamento = req.body.dataLancamento;
  const imagem = req.body.imagem;
  const categoria = req.body.categoria;

  try {
    const result = await global.db.insert({ titulo, sinopse, duracao, dataLancamento, imagem, categoria });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const doc = await global.db.findOne(id);
    res.render('new', { title: 'Edição do Filme', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = req.body.duracao;
  const dataLancamento = req.body.dataLancamento;
  const imagem = req.body.imagem;
  const categoria = req.body.categoria;

  try {
    const result = await global.db.update(id, { titulo, sinopse, duracao, dataLancamento, imagem, categoria });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;