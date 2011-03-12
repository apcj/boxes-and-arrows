var parse = function() {
	var splitClassNames = function(line) {
		var splitIndex = line.lastIndexOf(" .");
		if (splitIndex === -1) {
			return { name: line, classes: [] };
		} else {
			return { name: line.substring(0, splitIndex), classes: line.substr(splitIndex + 2).split(".") };
		}
	}
	
	return function(lines) {
		var tree = { classes: [], children: [] };
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
				lastChild = splitClassNames(line);
				lastChild.children = [];
				path[path.length - 1].children.push(lastChild);
				blankLineCount = 0;
			}
		}
		return tree;
	}
}();


