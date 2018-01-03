$ = jQuery

$(document).ready(function(){
	
	// globals
	var HEIGHT, windowSize, planeAttr, titanTex, titanMat, titanmesh, wordmarkTex, wordmarkMat, wordmarkMesh, saturnTex, saturnMat, saturnMesh, saturnBGTex, saturnBGMat, saturnBGMesh, rheaTex, rheaMat, rheaMesh, hillTreeTex, hillTreeMat, hillTreeMesh, hillBGTex, hillBGMat, hillMGMesh	
	
	// get window denomination
	if(window.innerWidth > 1024) windowSize = 'large'
	else if(window.innerWidth <= 1024 && window.innerWidth > 600) windowSize = 'medium'
	else windowSize = 'small'
	
	var numTexturesToLoad = 0
	var isWindowLoaded = false
	var is3DtexturesLoaded = false
	var mouseX = 0;
	var mouseY = 0;
	const WIDTH = jQuery(window).width()
	if(windowSize == 'large') HEIGHT = 2200
	else if(windowSize == 'medium') HEIGHT = 1800
	else HEIGHT = 1650
	const WINDOWHEIGHT = $(window).height()
	const VIEW_ANGLE = 45
	const ASPECT = WIDTH / HEIGHT
	const screenAspect = WIDTH / WINDOWHEIGHT
	const NEAR = 0.1
	const FAR = 10000
	const container = document.querySelector('body')
	var headerHidden = false
	const header = $("#menu")

	// system scene
	const camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR )
	const renderer = new THREE.WebGLRenderer({alpha: true})
	renderer.setSize(WIDTH, HEIGHT)
	container.appendChild(renderer.domElement)

	const scene = new THREE.Scene()
	scene.add(camera)

	// css scene
	elementBorder = document.getElementById('border')
	div = new THREE.CSS3DObject(elementBorder)
	div.position.z = 1340
	div.rotation.z = Math.PI * 45

	elementBorderFaded = document.getElementById('border-faded')
	divBorderFaded = new THREE.CSS3DObject(elementBorderFaded)
	divBorderFaded.position.z = 1340
	divBorderFaded.rotation.z = Math.PI * 45

	elementMenu = document.getElementById('menu')
	divMenu = new THREE.CSS3DObject(elementMenu)
	divMenu.position.z = 1250
	divMenu.rotation.z = Math.PI * 45

	sceneCSS = new THREE.Scene();
	sceneCSS.add(div)
	sceneCSS.add(divBorderFaded)
	sceneCSS.add(divMenu)

	var distance = 1340;
	var FOV = 2 * Math.atan( window.innerHeight / ( 2 * distance ) ) * 180 / Math.PI;
	const cameraCSS = new THREE.PerspectiveCamera( FOV, WIDTH / WINDOWHEIGHT, NEAR, FAR )
	sceneCSS.add(cameraCSS)
	cameraCSS.position.set(0,0,0)

	rendererCSS = new THREE.CSS3DRenderer();
	rendererCSS.setSize(WIDTH, WINDOWHEIGHT);
	rendererCSS.domElement.style.position = 'fixed';
	rendererCSS.domElement.style.top = 0
	rendererCSS.domElement.style.left = 0
	container.appendChild(rendererCSS.domElement);

	// else
	// $.getJSON("planes.json", createPlanes($json))
	$.getJSON("/wp-content/themes/fth/assets/javascripts/planes.json", function(json){
		if(windowSize == 'large') planeAttr = json.large
		else if(windowSize == 'medium') planeAttr = json.medium
		else planeAttr = json.small
		
		createPlanes()
		requestAnimationFrame(update)
	})

	//
	// setup
	function createPlanes($json){
		
		//titan
		titanTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/titan.png", on3DtextureLoaded)
		numTexturesToLoad++
		titanMat = new THREE.MeshBasicMaterial({ map: titanTex, transparent: true })
		titanMesh = new THREE.Mesh( new THREE.PlaneGeometry(planeAttr.titan.width, planeAttr.titan.height), titanMat)
		titanMat.opacity = 0
		titanMesh.position.z = -500
		titanMesh.position.y = planeAttr.titan.y
		scene.add(titanMesh)
		
		//wordmark
		wordmarkTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/wordmark.png", on3DtextureLoaded)
		numTexturesToLoad++		
		wordmarkMat = new THREE.MeshBasicMaterial({ map: wordmarkTex, transparent: true })
		wordmarkMesh = new THREE.Mesh( new THREE.PlaneGeometry(planeAttr.wordmark.width, planeAttr.wordmark.height), wordmarkMat)
		wordmarkMat.opacity = 0
		wordmarkMesh.position.z = -370
		wordmarkMesh.position.y = planeAttr.wordmark.y
		scene.add(wordmarkMesh)
		
		//saturn
		saturnTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/saturn.png", on3DtextureLoaded)
		numTexturesToLoad++		
		saturnMat = new THREE.MeshBasicMaterial({ map: saturnTex, transparent: true })
		saturnMesh = new THREE.Mesh( new THREE.PlaneGeometry(planeAttr.saturn.width, planeAttr.saturn.height), saturnMat)
		saturnMat.opacity = 0
		saturnMesh.position.x = planeAttr.saturn.x
		saturnMesh.position.z = -2500
		saturnMesh.position.y = planeAttr.saturn.y
		saturnMesh.scale.x = 2.7
		saturnMesh.scale.y = 2.7
		scene.add(saturnMesh)
		
		//saturn
		saturnBGTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/saturn_bg.png", on3DtextureLoaded)
		numTexturesToLoad++		
		saturnBGMat = new THREE.MeshBasicMaterial({ map: saturnBGTex, transparent: true })
		saturnBGMesh = new THREE.Mesh( new THREE.PlaneGeometry(planeAttr.saturnBG.width, planeAttr.saturnBG.height), saturnBGMat)
		saturnBGMat.opacity = 0
		saturnBGMesh.position.z = -3000
		saturnBGMesh.position.y = planeAttr.saturnBG.y
		saturnBGMesh.scale.x = 2.5
		saturnBGMesh.scale.y = 2.5
		scene.add(saturnBGMesh)
		
		//rhea
		rheaTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/moon.png", on3DtextureLoaded)
		numTexturesToLoad++		
		rheaMat = new THREE.MeshBasicMaterial({ map: rheaTex, transparent: true })
		rheaMesh = new THREE.Mesh( new THREE.PlaneGeometry(planeAttr.rhea.width, planeAttr.rhea.height), rheaMat)		
		rheaMat.opacity = 0
		rheaMesh.position.z = -900
		rheaMesh.position.x = 130
		rheaMesh.position.y = 280
		scene.add(rheaMesh)
		
		//hill tree
		hillTreeTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/hill_tree.png", on3DtextureLoaded)
		numTexturesToLoad++		
		hillTreeMat = new THREE.MeshBasicMaterial({ map: hillTreeTex, transparent: true })
		hillTreeMesh = new THREE.Mesh( new THREE.PlaneGeometry(planeAttr.hilltree.width, planeAttr.hilltree.height), hillTreeMat)
		hillTreeMesh.position.z = -1600
		hillTreeMesh.position.y = planeAttr.hilltree.y
		scene.add(hillTreeMesh)
		
		//hill bg
		hillBGTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/hill_bg.png", on3DtextureLoaded)
		numTexturesToLoad++		
		hillBGMat = new THREE.MeshBasicMaterial({ map: hillBGTex, transparent: true })
		hillBGMesh = new THREE.Mesh( new THREE.PlaneGeometry(planeAttr.hilltreeBG.width, planeAttr.hilltreeBG.height), hillBGMat)
		hillBGMesh.position.z = -8000
		hillBGMesh.position.y = planeAttr.hilltreeBG.y
		scene.add(hillBGMesh)
	}
	
	//
	// three.js updates
	function update(){
		camera.position.set(0 + mouseX, -jQuery(document).scrollTop() * .1 - mouseY, 0);
		cameraCSS.position.set(0 + mouseX * .5, 0 + mouseY * .5, 0);
		div.rotation.x = Math.PI * (mouseY * .001)
		div.rotation.y = Math.PI * (mouseX * -.001)
		divBorderFaded.rotation.x = Math.PI * (mouseY * .0012)
		divBorderFaded.rotation.y = Math.PI * (mouseX * -.0012)
		divMenu.rotation.x = Math.PI * (mouseY * .001)
		divMenu.rotation.y = Math.PI * (mouseX * -.001)

	  renderer.render(scene, camera)
	  rendererCSS.render(sceneCSS, cameraCSS);
	  requestAnimationFrame(update)
	}

	//
	// events
	var tanFOV = Math.tan( ( ( Math.PI / 180 ) * cameraCSS.fov / 2 ) )
	var windowHeight = window.innerHeight

	function loadComplete(){
		if(is3DtexturesLoaded & isWindowLoaded){
			// set
			TweenLite.set([$('.patch'), $('#menu')], {opacity: 0, scale: .9})
			TweenLite.set($('.content'), {opacity: 0})

			// animate
			TweenLite.to($('.loader'), .6, {css:{scaleX: .6, scaleY: .6, y: 6, opacity: 0}, delay: 1, ease: Sine.easeIn})
			TweenLite.to($('.shroud'), 1, {css:{opacity: 0}, ease: Sine.easeInOut, delay: 1.5})
						
			TweenLite.from(elementBorder, .8, {width: 10, height: 10, opacity: 0, ease: Power4.easeInOut, delay: 1.6})
			TweenLite.from(elementBorderFaded, .8, {width: 10, height: 10, opacity: 0, ease: Power4.easeInOut, delay: 1.66})
			TweenLite.to($('.background-wrapper'), 1.2, {opacity: 1, ease: Sine.easeInOut, delay: 2})
			TweenLite.to($('#menu'), .5, {opacity: 1, scaleX: 1, scaleY: 1, ease: Sine.easeOut, delay: 2.3})
			TweenLite.to($('.patch'), .5, {opacity: 1, scaleX: 1, scaleY: 1, ease: Sine.easeOut, delay: 3.5, onComplete: removeShroud})
			
			// system
			const delayOffset = 2.5

			TweenLite.to(saturnMat, 1.25, {opacity: 1, delay: delayOffset, ease: Sine.easeInOut})
			TweenLite.from(saturnMesh.position, 1.5, {z: -2000, delay: delayOffset, ease: Cubic.easeOut})
			TweenLite.to(saturnBGMat, 2, {opacity: 1, delay: delayOffset, ease: Sine.easeInOut})

			TweenLite.to(titanMat, 1, {opacity: 1, delay: delayOffset + .5, ease: Sine.easeInOut})
			TweenLite.from(titanMesh.position, 2, {z: -200, y: 25, delay: delayOffset + .5, ease: Cubic.easeOut})

			TweenLite.to(wordmarkMat, 1.5, {opacity: 1, delay: delayOffset + 1.5,  ease: Sine.easeInOut})
			TweenLite.from(wordmarkMesh.position, 2, {z: -390, y: planeAttr.wordmark.animateY, delay: delayOffset + 1.5,  ease: Cubic.easeOut})

			TweenLite.to(rheaMat, 1, {opacity: 1, delay: delayOffset + 1, ease: Sine.easeInOut})
		
			// content
			TweenLite.to($('.content'), 1, {opacity: 1, delay: delayOffset + 2, ease: Sine.easeInOut})
		}
	}
	if(!isTouchDevice()){
		$(document).mousemove(function(e){
    	mouseX = (e.pageX / WIDTH - .5) * 15
    	mouseY = ((e.pageY - jQuery(document).scrollTop()) / WINDOWHEIGHT - .5) * 15
		})
	}
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 500) {
        header.addClass("hidden")
    } else {
        header.removeClass("hidden")
    }
  })
	$(window).load(function(){
		isWindowLoaded = true
		loadComplete()
	})
	$(window).resize(function(){
		cameraCSS.aspect = window.innerWidth / window.innerHeight
		camera.aspect = window.innerWidth / HEIGHT
    cameraCSS.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) )
    cameraCSS.updateProjectionMatrix()
		camera.updateProjectionMatrix()
		$(elementBorder).css('width', window.innerWidth - ((window.innerWidth < 1024) ? 30 : 60) )
		$(elementBorder).css('height', window.innerHeight - ((window.innerWidth < 1024) ? 30 : 60) )
		$(elementBorderFaded).css('width', window.innerWidth - ((window.innerWidth < 1024) ? 20 : 45) )
		$(elementBorderFaded).css('height', window.innerHeight - ((window.innerWidth < 1024) ? 20 : 45) )
		renderer.setSize (window.innerWidth, HEIGHT )
		rendererCSS.setSize( window.innerWidth, window.innerHeight )
	})
	
	//
	// utils
	function on3DtextureLoaded(){
		numTexturesToLoad--
		if(numTexturesToLoad == 0) is3DtexturesLoaded = true
		loadComplete()
	}
	function removeShroud(){
		$('.shroud').remove()
	}
})