import type { DocumentResponse } from '../services/api/baseApi/types';

export const mockDocuments: DocumentResponse[] = [
  {
    id: 1,
    name: 'Term Sheet - TechStart Inc',
    company_name: 'TechStart Inc',
    description: 'Series A term sheet',
    upload_date: '2023-04-05',
    file: 'https://example.com/documents/term-sheet-techstart.pdf',
    created_at: '2023-04-05T10:00:00Z',
    updated_at: '2023-04-05T10:00:00Z'
  },
  {
    id: 2,
    name: 'Investment Agreement',
    company_name: 'DataFlow Systems',
    description: 'Angel investment agreement',
    upload_date: '2023-06-20',
    file: 'https://example.com/documents/investment-agreement-dataflow.pdf',
    created_at: '2023-06-20T10:00:00Z',
    updated_at: '2023-06-20T10:00:00Z'
  }
];
