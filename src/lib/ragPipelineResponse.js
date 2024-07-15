// src/lib/ragPipelineResponse.js
// This class represents the overall response from the RAG pipeline
export class RagPipelineResponse {
  constructor(data) {
    // validate the input data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided to RagPipelineResponse');
    }
    // Initialize properties from the input data
    this.queryId = data.query_id || '';
    // Create an array of RagResult objects from the results data
    this.results = Array.isArray(data.results)
      ? data.results.map(resultData => new RagResult(resultData))
      : [];
  }
  // Process all results in this response
  processResults() {
    this.results.forEach(result => result.processAnswers());
  }
}
// This class represents a single result from the RAG pipeline
export class RagResult {
  constructor(data) {
    // Validate input data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided to RagResult');
    }
    // Initialize properties from the input data
    this.queryId = data.query_id || '';
    this.query = data.query || '';
    // Create arrays of RagAnswer and RagDocument objects
    this.answers = Array.isArray(data.answers)
      ? data.answers.map(answerData => new RagAnswer(answerData))
      : [];
    this.documents = Array.isArray(data.documents)
      ? data.documents.map(documentData => new RagDocument(documentData))
      : [];
  }
  // Process all answers in this result
  processAnswers() {
    this.answers.forEach(answer => answer.processReferences(this.documents));
  }
}
// This class represents an individual answer from the RAG pipeline
export class RagAnswer {
  constructor(data) {
    // Validate input data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided to RagAnswer');
    }
    // Initialize properties from the input data
    this.answer = data.answer || '';
    this.type = data.type || '';
    this.meta = data.meta || {};
    this.file = data.file || null;
  }
  // Process references for this answer
  processReferences(documents) {
    // If there are references and documents, link them together
    if (Array.isArray(this.meta?._references) && Array.isArray(documents)) {
      this.meta._references.forEach(reference => {
        reference.document = documents.find(doc => doc.id === reference.document_id) || null;
      });
    }
  }
}
// This class represents a document referenced in the RAG pipeline response
export class RagDocument {
  constructor(data) {
    // Validate input data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided to RagDocument');
    }
    // Initialize properties from the input data
    this.id = data.id || '';
    this.content = data.content || '';
    this.contentType = data.content_type || '';
    this.meta = data.meta || {};
    this.file = data.file || null;
  }
}