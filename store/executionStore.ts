export const executionStore = {
  status: 'idle' as 'idle' | 'running' | 'completed',
  setStatus(status: 'idle' | 'running' | 'completed') {
    this.status = status;
  },
};
