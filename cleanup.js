(function () {
  'use strict';
  const Q = window.QUESTIONS;
  if (!Array.isArray(Q)) throw new Error('QUESTIONS databaze nebyla nactena.');

  const sectionTail = /\s+(?:[123][.]\s*)?(?:Clovek a spolecnost|Člověk a společnost|Stat a pravo|Stát a právo|Hospodarstvi a svet|Hospodářství a svět)\s*$/u;
  const sourceFooter = /\s+(?:Pouzite zdroje|Použité zdroje|Zdroje):[\s\S]*$/u;
  const copyrightFooter = /\s+Veskera prava vyhrazena[\s\S]*$/u;
  const nextPassage = /\s+TEXT K ULOHAM?\s+\d+\s+(?:AZ|AŽ|A)\s+\d+[\s\S]*$/u;

  function cleanTail(value) {
    if (typeof value !== 'string') return value;
    let s = value.trim();
    let previous;
    do {
      previous = s;
      s = s.replace(sourceFooter, '').replace(copyrightFooter, '').replace(nextPassage, '').replace(sectionTail, '').trim();
    } while (s !== previous);
    return s;
  }

  const changes = [];
  for (const q of Q) {
    const beforeText = q.text;
    q.text = cleanTail(q.text);
    if (q.text !== beforeText) changes.push({ id: q.id, field: 'text' });

    if (q.opts && typeof q.opts === 'object') {
      for (const key of Object.keys(q.opts)) {
        const before = q.opts[key];
        q.opts[key] = cleanTail(before);
        if (q.opts[key] !== before) changes.push({ id: q.id, field: 'opts.' + key });
      }
    }
  }

  window.QUESTIONS_CLEANUP_REPORT = Object.freeze({ checked: Q.length, changed: changes.length, changes });
})();
