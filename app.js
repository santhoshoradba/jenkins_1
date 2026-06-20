document.getElementById('clickMe').addEventListener('click', function () {
  document.getElementById('message').textContent = 'Hello from Jenkins! Built at ' + new Date().toLocaleString();
});
