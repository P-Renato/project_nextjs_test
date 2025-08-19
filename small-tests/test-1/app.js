const textarea = document.getElementById('noteInput');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

// Load saved note on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedNote = localStorage.getItem('mynote');
  if (savedNote) {
    textarea.value = savedNote;
    status.textContent = '✅ Note loaded from storage.';
  }
});

// Save note when button is clicked
saveBtn.addEventListener('click', () => {
  const content = textarea.value.trim();

  if (content) {
    localStorage.setItem('mynote', content);
    status.textContent = '💾 Note saved!';
  } else {
    status.textContent = '⚠️ Note is empty!';
  }
});

