var parse = function(lines) {
	var tree = { children: [] };
	var path = [ tree ];
	var lastChild = tree;
	var blankLineCount = 0;
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line === "") {
			blankLineCount++;
		} else {
			if (blankLineCount === 1) {
				path.push(lastChild);
			} else if (blankLineCount > 1) {
				for (var depth = 1; depth < blankLineCount; depth++) {
					if (path.length > 1) path.pop();
				}
			}
			lastChild = { name: line, children: [] }
			path[path.length - 1].children.push(lastChild);
			blankLineCount = 0;
		}
	}
	return tree;
}