var drawDiagram = function(diagramSource) {
	r.clear();
	drawNode(diagramSource, { x: 100, y: 0 });
}

var drawNode = function(node, location) {
	var boundingBox = { width: padding, height: padding };
	if (node.children) {
		for (var i = 0; i < node.children.length; i++) {
			var child = node.children[i];
			var childBox = drawNode(child, { x: location.x + padding, y: location.y + boundingBox.height });
			boundingBox.height += childBox.height + padding;
			var minimumWidth = childBox.width + padding * 2;
			if (boundingBox.width < minimumWidth) boundingBox.width = minimumWidth;
		}
	}
	if (boundingBox.height < smallestBox.height) boundingBox = smallestBox;
	var rect = r.rect(location.x, location.y, boundingBox.width, boundingBox.height);
	rect.attr({ stroke: "#000", "stroke-width": 2 });
	r.text(location.x + boundingBox.width / 2, location.y + padding / 2, node.name);
	return boundingBox;
}
