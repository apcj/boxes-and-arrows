var browserStorage = function() {
	var browserStoragePackage = [];

	var diagramStorageKey = null;
	
	var refeshExistingDocumentsList = function() {
		$(".ba-existing-documents-list").find("*").remove();
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			if (key.indexOf("boxesAndArrows.source.") === 0) {
				$(".ba-existing-documents-list").append("<option>" + key.substr("boxesAndArrows.source.".length) + "</option>");
			}
		}
	}

	var showSaveSuccessfulMessage = function() {
		var message = $(".ba-message.prototype").clone();
		message.text("Saved successfully");
		message.removeClass("prototype");
		$(".ba-button-bar").append(message);
		message.fadeOut(3000, function() {
			message.remove();
		})
	}

	browserStoragePackage.init = function(getCurrentState, setCurrentState) {

		var displaySaveAsDialog = function() {
			refeshExistingDocumentsList();
			$(".modal-panel").find("h2").text("Save As");
			$("#ba-button-ok").text("Save").click(saveAs);
			$(".glasspane").removeClass("hidden");
		}
		
		var displayOpenDialog = function() {
			refeshExistingDocumentsList();
			$(".modal-panel").find("h2").text("Open");
			$("#ba-button-ok").text("Open").click(open);
			$(".glasspane").removeClass("hidden");
		}
		
		var open = function() {
			diagramStorageKey = $("#ba-diagram-storage-key").val();
			setCurrentState(localStorage.getItem("boxesAndArrows.source." + diagramStorageKey));
			localStorage.setItem("boxesAndArrows.lastOpenDocument", diagramStorageKey);
			$(".glasspane").addClass("hidden");
			editorChanged();
		}

		var saveAs = function() {
			diagramStorageKey = $("#ba-diagram-storage-key").val();
			save();
			$(".glasspane").addClass("hidden");
		}

		var save = function() {
			if (diagramStorageKey) {
				localStorage.setItem("boxesAndArrows.source." + diagramStorageKey, getCurrentState());
				localStorage.setItem("boxesAndArrows.lastOpenDocument", diagramStorageKey);
				showSaveSuccessfulMessage();
			} else {
				displaySaveAsDialog();
			}
		}

		var loadLastOpenDocumentIfExists = function() {
			var lastOpenDocument = localStorage.getItem("boxesAndArrows.lastOpenDocument");
			if (lastOpenDocument) {
				setCurrentState(localStorage.getItem("boxesAndArrows.source." + lastOpenDocument));
				diagramStorageKey = lastOpenDocument;
			}
		}

		var bindStorageButtons = function() {
			$(".ba-button-open").click(displayOpenDialog);
			$(".ba-button-save").click(save);
			$(".ba-button-save-as").click(displaySaveAsDialog);
			$("#ba-button-cancel").click(function() {
				$(".glasspane").addClass("hidden");
			});
			$(".ba-existing-documents-list").change(function() {
				$("#ba-diagram-storage-key").val($(".ba-existing-documents-list").val());
			});
		}

		bindStorageButtons();
		loadLastOpenDocumentIfExists();
	}
	
	return browserStoragePackage;
}();