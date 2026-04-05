export const downloadJson = (data, fileName) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadHtmlBundle = (title, entries) => {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:Arial;padding:16px;background:#0f172a;color:#e2e8f0}article{border:1px solid #334155;margin:12px 0;padding:12px;border-radius:12px}</style></head><body><h1>${title}</h1>${entries
    .map((entry) => `<article><h2>${entry.title}</h2><p>${entry.summary}</p><div>${entry.content}</div></article>`)
    .join('')}</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-bundle.html`;
  a.click();
  URL.revokeObjectURL(url);
};
