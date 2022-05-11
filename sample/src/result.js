import axios from 'axios';

const result = {
  async render() {
    const res = await axios.get('/api/users');

    return (res.data || [])
      .map(user => {
        return `<div>${user.id}: ${user.name}</div>`;
      })
      .join('---');
  },
};

export default result;
