// src/app/utils/ragUtils.js

export const addReferences = (answer, meta) => {
  const references = meta._references.filter(ref => ref.label === 'grounded');
  const { referenceList, answerWithReferences } = references.reduce((acc, ref, index) => {
    const referenceNote = `[${index + 1}]`;
    const context = ref.document.content.slice(ref.doc_start_idx, ref.doc_end_idx);

    // Update reference list
    acc.referenceList += `${referenceNote} ${context}\n\n`;

    // Insert reference note into answer
    const answerEndIndex = ref.answer_end_idx + acc.endIndexIncrement;
    acc.answerWithReferences = 
      acc.answerWithReferences.slice(0, answerEndIndex) +
      referenceNote +
      acc.answerWithReferences.slice(answerEndIndex);

    acc.endIndexIncrement += referenceNote.length;

    return acc;
  }, { referenceList: '', answerWithReferences: answer, endIndexIncrement: 0 });

  return { referenceList, answerWithReferences };
};
