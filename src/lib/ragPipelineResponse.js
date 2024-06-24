// src/lib/ragPipelineResponse.js

export class RagPipelineResponse {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided to RagPipelineResponse');
    }
    this.queryId = data.query_id || '';
    this.results = Array.isArray(data.results) 
      ? data.results.map(resultData => new RagResult(resultData))
      : [];
  }

  processResults() {
    this.results.forEach(result => result.processAnswers());
  }
}

export class RagResult {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided to RagResult');
    }
    this.queryId = data.query_id || '';
    this.query = data.query || '';
    this.answers = Array.isArray(data.answers) 
      ? data.answers.map(answerData => new RagAnswer(answerData))
      : [];
    this.documents = Array.isArray(data.documents) 
      ? data.documents.map(documentData => new RagDocument(documentData))
      : [];
  }

  processAnswers() {
    this.answers.forEach(answer => answer.processReferences(this.documents));
  }
}

export class RagAnswer {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided to RagAnswer');
    }
    this.answer = data.answer || '';
    this.type = data.type || '';
    this.meta = data.meta || {};
    this.file = data.file || null;
  }

  processReferences(documents) {
    if (Array.isArray(this.meta?._references) && Array.isArray(documents)) {
      this.meta._references.forEach(reference => {
        reference.document = documents.find(doc => doc.id === reference.document_id) || null;
      });
    }
  }
}

export class RagDocument {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided to RagDocument');
    }
    this.id = data.id || '';
    this.content = data.content || '';
    this.contentType = data.content_type || '';
    this.meta = data.meta || {};
    this.file = data.file || null;
  }
}