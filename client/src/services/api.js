const API_BASE = '/api';

export async function fetchBooks(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/books?${query}`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function fetchBookById(id) {
  const res = await fetch(`${API_BASE}/books/${id}`);
  if (!res.ok) throw new Error('Book not found');
  return res.json();
}

export async function createBook(bookData) {
  const res = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  });
  if (!res.ok) throw new Error('Failed to create book');
  return res.json();
}

export async function updateBook(id, bookData) {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  });
  if (!res.ok) throw new Error('Failed to update book');
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function signupUser(userData) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
}

export async function fetchLoans(userId) {
  const res = await fetch(`${API_BASE}/loans?userId=${userId || ''}`);
  if (!res.ok) throw new Error('Failed to fetch loans');
  return res.json();
}

export async function borrowBook(userId, bookId) {
  const res = await fetch(`${API_BASE}/loans/borrow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, bookId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to borrow book');
  return data;
}

export async function returnBook(loanId) {
  const res = await fetch(`${API_BASE}/loans/return`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ loanId })
  });
  if (!res.ok) throw new Error('Failed to return book');
  return res.json();
}

export async function renewLoan(loanId) {
  const res = await fetch(`${API_BASE}/loans/renew`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ loanId })
  });
  if (!res.ok) throw new Error('Failed to renew loan');
  return res.json();
}

export async function fetchFavorites(userId) {
  const res = await fetch(`${API_BASE}/favorites?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch favorites');
  return res.json();
}

export async function toggleFavorite(userId, bookId) {
  const res = await fetch(`${API_BASE}/favorites/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, bookId })
  });
  if (!res.ok) throw new Error('Failed to toggle favorite');
  return res.json();
}

export async function fetchReviews(bookId) {
  const res = await fetch(`${API_BASE}/reviews/${bookId}`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function addReview(reviewData) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });
  if (!res.ok) throw new Error('Failed to add review');
  return res.json();
}

export async function fetchAdminStats() {
  const res = await fetch(`${API_BASE}/admin/stats`);
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  return res.json();
}

export async function fetchAdminUsers() {
  const res = await fetch(`${API_BASE}/admin/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function updateUserRole(userId, role) {
  const res = await fetch(`${API_BASE}/admin/users/${userId}/role`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role })
  });
  if (!res.ok) throw new Error('Failed to update role');
  return res.json();
}
