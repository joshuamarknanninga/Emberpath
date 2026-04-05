const OfflinePack = require('../models/OfflinePack');
const KnowledgeEntry = require('../models/KnowledgeEntry');

const buildPack = async (req, res) => {
  const { title, entryIds = [], format = 'json', includeMapReports = true } = req.body;
  const pack = await OfflinePack.create({
    user: req.userId,
    title,
    entryIds,
    format,
    includeMapReports
  });

  res.status(201).json(pack);
};

const exportPack = async (req, res) => {
  const pack = await OfflinePack.findOne({ _id: req.params.id, user: req.userId });
  if (!pack) return res.status(404).json({ message: 'Pack not found' });

  const entries = await KnowledgeEntry.find({ _id: { $in: pack.entryIds } });

  if (pack.format === 'html') {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${pack.title}</title></head><body><h1>${pack.title}</h1>${entries
      .map((e) => `<article><h2>${e.title}</h2><p>${e.summary}</p><div>${e.content}</div></article>`)
      .join('')}</body></html>`;
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }

  res.json({ pack, entries, exportedAt: new Date().toISOString() });
};

module.exports = { buildPack, exportPack };
