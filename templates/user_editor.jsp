<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="no-js">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>editor| wemater.org</title>
<meta name="description" content="wemater.org">
<meta name="viewport"
	content="width=device-width, initial-scale=1, user-scalable=no">

<link rel="stylesheet" href="../../css/normalize.css">
<link rel="stylesheet" href="../../css/pushy.css">
<link rel="stylesheet" href="../../css/app.css">
<link rel="stylesheet" href="../../css/app-font.css">
<link rel="stylesheet" href="../../css/foundation.css">
<link rel="stylesheet" href="../../css/jquery-ui.css">
<link rel="stylesheet" href="../../css/sweetalert.css">

<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

<!-- editor styles -->
<link rel="stylesheet" type="text/css"
	href="../../editor/editorStyles/wmd.css" />
<link rel="stylesheet" type="text/css"
	href="../../editor/editorStyles/editorSync.css" />
<script type="text/javascript" src="../../editor/editorScript/showdown.js"></script>
<script type="text/javascript"
	src="../../editor/editorScript/autosize.min.js"></script>


</head>

<body class="body">

	<div class=" user-wrapper  ">

		<div class="editor hide-for-small-only  ">


			<div id="uploaded-image" class="editor-controls">
				<!-- upload image -->
				<div class="control-wrapper float-right ">
					<a id="ed-sl" class="editor-done" title="save the article"><span
						class="fa  fa-hdd-o fa-border-sleek"></span></a>
					<a class="editor-upload" title="upload the cover image"><span
						class="fa fa-camera "></span></a> <input id="upload" type="file" />

				</div>
				<!-- upload image end -->
				<!-- cover title -->
				<textarea class="cover-title-input"></textarea>
				<h1 class="cover-title-heading"></h1>
				<!-- cover title end-->
			</div>












			<div
				class="editor-wrapper large-10 large-centered medium-12   columns">

				<div id="wmd-preview" class="wmd-panel"></div>
				<div id="wmd-output" class="wmd-panel"></div>

				<div id="wmd-editor" class="wmd-panel">
					<div id="wmd-button-bar"></div>
					<textarea id="wmd-input"></textarea>
				</div>
			</div>

			<div
				class=" editor-side large-8 large-centered medium-12 large-centered medium-centered columns ">

				<div class="show-tags large-12 medium-10 large-centered medium-centered  columns">
					<div class="small-12 large-12 medium-12 columns">
						<input class="tags" type="text" placeholder="put related tags"
							title="tags should be seperated with comma" /> <span
							id="tag-error" class=" error-box"></span>
					</div>
					<div class="tag-list small-12 large-12 medium-12"></div>

				</div>

			</div>
			<!--  editor side -->

		</div>
		<!-- editor end -->





		<div class="editor-not  small-12 large-12 medium-12  ">	</div>



	</div>
	<!-- user-wrapper end -->

	<footer class=" user-footer small-12 large-12 medium-12 columns">

		<i class="fa fa-copyright"></i><small>Copyright 2001-2014
			wemater.org - All Rights Reserved </small>


	</footer>
<!-- jQuery -->
<script src="../../js/jquery-1.11.3.js"></script>
<script src="../../js/jquery-ui.js"></script>
<script src="../../js/modernizr.js"></script>

	<script src="../../js/util.js"></script>
		<script src="../../js/commons.js"></script>
	<script src="../../js/u_editor.js"></script>
	<script src="../../js/sweetalert.min.js"></script>
	<script src="../../js/autosize.min.js"></script>
	<script src="../../editor/editorScript/wmd.js"></script>
</body>
</html>