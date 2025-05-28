function toggleNews(button) {
  const fullText = button.nextElementSibling;
  if (fullText.classList.contains('hidden')) {
    fullText.classList.remove('hidden');
    button.textContent = 'Скрыть';
  } else {
    fullText.classList.add('hidden');
    button.textContent = 'Показать';
  }
}
