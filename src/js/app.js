define(['secondModule'], function(secondModule) {
	var jsOutput = document.getElementById('js-output');
	jsOutput.innerHTML += 'Entry module works!';
	jsOutput.innerHTML += '\n'+'Second module works!';
});
