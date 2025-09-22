

/*export function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem('theme', name);
}

export function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return setTheme(saved);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}
export function ThemeToggleButton() {
  return (
    <button onClick={() => {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(cur === 'light' ? 'dark' : 'light');
    }}>
      Toggle theme
    </button>
  );
}
*/