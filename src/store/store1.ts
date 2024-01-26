
type State = {
  page: number;
  pageSize: number;
  searchTerm: string;
  questions: any[];
  totalItems: number;
  loading: boolean;
  errorMessage: string;
  update: boolean;
  
};

type Store = State & {
  fetchQuestionsData: () => Promise<void>;
  setState: (state: Partial<State>) => void;
};
