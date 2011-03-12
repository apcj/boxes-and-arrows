describe("Parser", function() {

  it("should parse a simple list", function() {
  	var tree = parse([
		"item 1",
		"item 2",
		"item 3"
	]);
	expect(tree.children.length).toEqual(3);
	expect(tree.children[0].name).toEqual("item 1");
	expect(tree.children[1].name).toEqual("item 2");
	expect(tree.children[2].name).toEqual("item 3");
  });

  it("should parse a simple heirarchy", function() {
  	var tree = parse([
		"parent",
		"",
		"child",
		"",
		"grandchild"
	]);
	expect(tree.children.length).toEqual(1);
	expect(tree.children[0].name).toEqual("parent");
	expect(tree.children[0].children.length).toEqual(1);
	expect(tree.children[0].children[0].name).toEqual("child");
	expect(tree.children[0].children[0].children.length).toEqual(1);
	expect(tree.children[0].children[0].children[0].name).toEqual("grandchild");
  });

  it("should move back up the tree after two blank lines", function() {
  	var tree = parse([
		"parent",
		"",
		"child 1",
		"",
		"grandchild 1",
		"",
		"",
		"child 2",
		"",
		"grandchild 2"
	]);
	expect(tree.children.length).toEqual(1);
	expect(tree.children[0].name).toEqual("parent");
	expect(tree.children[0].children.length).toEqual(2);
	expect(tree.children[0].children[0].name).toEqual("child 1");
	expect(tree.children[0].children[0].children.length).toEqual(1);
	expect(tree.children[0].children[0].children[0].name).toEqual("grandchild 1");
	expect(tree.children[0].children[1].name).toEqual("child 2");
	expect(tree.children[0].children[1].children.length).toEqual(1);
	expect(tree.children[0].children[1].children[0].name).toEqual("grandchild 2");
  });

  it("should move further up the tree after three blank lines", function() {
  	var tree = parse([
		"parent 1",
		"",
		"child 1",
		"",
		"grandchild",
		"",
		"",
		"",
		"parent 2",
		"",
		"child 2"
	]);
	expect(tree.children.length).toEqual(2);
	expect(tree.children[0].name).toEqual("parent 1");
	expect(tree.children[0].children.length).toEqual(1);
	expect(tree.children[0].children[0].name).toEqual("child 1");
	expect(tree.children[0].children[0].children.length).toEqual(1);
	expect(tree.children[0].children[0].children[0].name).toEqual("grandchild");
	expect(tree.children[1].name).toEqual("parent 2");
	expect(tree.children[1].children.length).toEqual(1);
	expect(tree.children[1].children[0].name).toEqual("child 2");
  });

  it("should ignore excessive blank lines", function() {
  	var tree = parse([
		"parent 1",
		"",
		"child 1",
		"",
		"grandchild",
		"",
		"",
		"",
		"",
		"",
		"parent 2"
	]);
	expect(tree.children.length).toEqual(2);
	expect(tree.children[0].name).toEqual("parent 1");
	expect(tree.children[0].children.length).toEqual(1);
	expect(tree.children[0].children[0].name).toEqual("child 1");
	expect(tree.children[0].children[0].children.length).toEqual(1);
	expect(tree.children[0].children[0].children[0].name).toEqual("grandchild");
	expect(tree.children[1].name).toEqual("parent 2");
  });

  it("should attach single class name when supplied", function() {
  	var tree = parse([
		"node .classname"
	]);
	expect(tree.children.length).toEqual(1);
	expect(tree.children[0].name).toEqual("node");
	expect(tree.children[0].classes.length).toEqual(1);
	expect(tree.children[0].classes[0]).toEqual("classname");
  });

  it("should attach multiple class names when supplied", function() {
  	var tree = parse([
		"node .classname1.classname2"
	]);
	expect(tree.children.length).toEqual(1);
	expect(tree.children[0].name).toEqual("node");
	expect(tree.children[0].classes.length).toEqual(2);
	expect(tree.children[0].classes[0]).toEqual("classname1");
	expect(tree.children[0].classes[1]).toEqual("classname2");
  });

});