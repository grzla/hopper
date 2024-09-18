export const fetchMessages = async () => {
  const response = await fetch('/api/messages');
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return await response.json();
};