const OPTIONS = new Map([['voteScore', 'Rating'], ['timestamp', 'Date']]);

export const getTitle = option => OPTIONS.get(option);

export const getDefault = () => 'voteScore';

export const getAll = () => Array.from(OPTIONS);

export const getCompareFunction = sortBy => (a, b) => b[sortBy] - a[sortBy];
