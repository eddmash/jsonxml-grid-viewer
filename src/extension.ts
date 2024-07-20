// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import { WebviewPanel } from 'vscode';
import { Message } from './dto/Message';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const extensionUri = context.extensionUri;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(`Congratulations, your extension "jsonXmlGridViewer" is now active! ${context.extensionPath}`);



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let panel: vscode.WebviewPanel | undefined = undefined
	context.subscriptions.push(vscode.commands.registerCommand('jsonXmlGridViewer.view', () => {

		let editor = vscode.window.activeTextEditor;
		console.log(editor?.document.uri);
		if (!editor) {
			return; // No open text editor
		}
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Json and Xml Grid Viewer!');
		// Create and show a new webview
		console.log("Rendered on=", vscode.window.activeTextEditor?.viewColumn);

		panel = vscode.window.createWebviewPanel(
			'jsonXmlGridViewer', // Identifies the type of the webview. Used internally
			'Json Xml Grid Viewer', // Title of the panel displayed to the user
			vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
			{
				enableScripts: true,
				retainContextWhenHidden: true,
				// Restrict the webview to only load resources from the `out` and `webview-ui/build` directories
				localResourceRoots: [
					vscode.Uri.joinPath(extensionUri, "out"),
					vscode.Uri.joinPath(extensionUri, "jsonxmlgrid", "build")
				],
			} // Webview options. More on these later.
		);
		// Render html of webview here
		panel.webview.html = createWebviewHTML(panel, context);
		panel.webview.onDidReceiveMessage((message: Message) => {
			switch (message.event) {
				case "OnLoad":
					if (panel) {
						postData({
							event: "OnData",
							message: { content: editor.document.getText(), languageId: editor.document.languageId }
						}, panel);
					}
					return;
			}
		});
	}));

	vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
		if (panel && editor) {
			panel.webview.html = createWebviewHTML(panel, context);
			postData({
				event: "OnData",
				message: { content: editor.document.getText(), languageId: editor.document.languageId }
			}, panel);

		}
	});
	// vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
	// 	console.log("window.onDidChangeActiveTextEditor: ", editor?.document.getText());
	// 	postData(editor?.document.getText(), editor, panel);
	// });
	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		let editor = vscode.window.activeTextEditor;
		if (panel && editor) {
			panel.webview.html = createWebviewHTML(panel, context);
			postData({
				event: "OnData",
				message: { content: editor.document.getText(), languageId: editor.document.languageId }
			}, panel);

		}
	});
}

function getNonce() {
	let text: string = "";
	const possible: string =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};


// getNonce generates a new random string to prevent external injection of foreign code into the HTML
const nonce: string = getNonce();

// Creates the HTML page for webview
function createWebviewHTML(panel: vscode.WebviewPanel, context: vscode.ExtensionContext): string {
	// Set URI to be the path to bundle
	const stylesUri: vscode.Uri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri,
		...['jsonxmlgrid', 'build', 'static', 'css', 'main.css']));

	// Set webview URI to pass into html script
	const scriptURI: vscode.Uri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, ...['jsonxmlgrid',
		'build', 'static', 'js', 'main.js']));

	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'none'; style-src ${panel.webview.cspSource}; script-src 'nonce-${nonce}';"
    />
    <link rel="stylesheet" type="text/css" href="${stylesUri}" />
    <title>Hello World</title>
  </head>
  <body>
    <div id="root"></div>
    <script nonce="${nonce}" src="${scriptURI}"></script>
  </body>
</html>
`;
}

// This method is called when your extension is deactivated
export function deactivate() { }


function postData(message: Message, panel: vscode.WebviewPanel) {
	console.log("Posting message", message);
	panel.webview.postMessage(message);
}


