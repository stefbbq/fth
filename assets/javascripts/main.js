$ = jQuery

jQuery(document).ready(function(){
	
	// globals
	var mouseX = 0;
	var mouseY = 0;
	const WIDTH = jQuery(window).width()
	const HEIGHT = 2200
	const WINDOWHEIGHT = $(window).height()
	const VIEW_ANGLE = 45
	const ASPECT = WIDTH / HEIGHT
	const screenAspect = WIDTH / WINDOWHEIGHT
	const NEAR = 0.1
	const FAR = 10000
	const container = document.querySelector('body')
	var headerHidden = false

	// system scene
	const camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR )
	const renderer = new THREE.WebGLRenderer({alpha: true})
	renderer.setSize(WIDTH, HEIGHT)
	container.appendChild(renderer.domElement)

	const scene = new THREE.Scene()
	scene.add(camera)

	// css scene
	element = document.getElementById('border')
	div = new THREE.CSS3DObject(element)
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
	createPlanes()
	// createLight()
	requestAnimationFrame(update)
	
	// bind events
	window.addEventListener('resize', onWindowResize, false);
	
	//
	// setup
	function createPlanes(){
		
		//titan
		titanTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/titan.png" )
		const titanMat = new THREE.MeshBasicMaterial({ map: titanTex, transparent: true })
		titanMat.opacity = 0
		const titanMesh = new THREE.Mesh( new THREE.PlaneGeometry(97,97), titanMat)
		titanMesh.position.z = -500
		titanMesh.position.y = 72
		scene.add(titanMesh)
		
		//wordmark
		wordmarkTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/wordmark.png" )
		const wordmarkMat = new THREE.MeshBasicMaterial({ map: wordmarkTex, transparent: true })
		wordmarkMat.opacity = 0
		const wordmarkMesh = new THREE.Mesh( new THREE.PlaneGeometry(100,25.6), wordmarkMat)
		wordmarkMesh.position.z = -370
		wordmarkMesh.position.y = 49
		scene.add(wordmarkMesh)
		
		//saturn
		saturnTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/saturn.png" )
		const saturnMat = new THREE.MeshBasicMaterial({ map: saturnTex, transparent: true })
		saturnMat.opacity = 0
		const saturnMesh = new THREE.Mesh( new THREE.PlaneGeometry(1000,548), saturnMat)
		saturnMesh.position.z = -2500
		saturnMesh.position.y = 580
		saturnMesh.scale.x = 2.7
		saturnMesh.scale.y = 2.7
		scene.add(saturnMesh)
		
		//saturn
		saturnBGTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/saturn_bg.png" )
		const saturnBGMat = new THREE.MeshBasicMaterial({ map: saturnBGTex, transparent: true })
		saturnBGMat.opacity = 0
		const saturnBGMesh = new THREE.Mesh( new THREE.PlaneGeometry(1024,600), saturnBGMat)
		saturnBGMesh.position.z = -3000
		saturnBGMesh.position.y = 680
		saturnBGMesh.scale.x = 2.5
		saturnBGMesh.scale.y = 2.5
		scene.add(saturnBGMesh)
		
		//rhea
		rheaTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/moon.png" )
		const rheaMat = new THREE.MeshBasicMaterial({ map: rheaTex, transparent: true })
		rheaMat.opacity = 0
		const rheaMesh = new THREE.Mesh( new THREE.PlaneGeometry(22,22), rheaMat)
		rheaMesh.position.z = -900
		rheaMesh.position.x = 130
		rheaMesh.position.y = 280
		scene.add(rheaMesh)
		
		//hill tree
		hillTreeTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/hill_tree.png" )
		const hillTreeMat = new THREE.MeshBasicMaterial({ map: hillTreeTex, transparent: true })
		const hillTreeMesh = new THREE.Mesh( new THREE.PlaneGeometry(350,350), hillTreeMat)
		hillTreeMesh.position.z = -1600
		hillTreeMesh.position.y = -600
		scene.add(hillTreeMesh)
		
		//hill bg
		hillBGTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/hill_bg.png" )
		const hillBGMat = new THREE.MeshBasicMaterial({ map: hillBGTex, transparent: true })
		const hillBGMesh = new THREE.Mesh( new THREE.PlaneGeometry(2800,2800), hillBGMat)
		hillBGMesh.position.z = -8000
		hillBGMesh.position.y = -1850
		scene.add(hillBGMesh)
		
		//
		// animate in
		TweenLite.to($('.shroud'), 1, {css:{opacity: 0}, ease: Sine.easeInOut, delay: 10, onComplete:animateIn});
		
		function animateIn(){
			$('.shroud').remove()
			
		TweenLite.to(saturnMat, .75, {opacity: 1, ease: Sine.easeInOut})
		TweenLite.from(saturnMesh.position, 1.5, {z: -2000, ease: Cubic.easeOut})
		TweenLite.to(saturnBGMat, 2, {opacity: 1, ease: Sine.easeInOut})
		
		TweenLite.to(titanMat, 1, {opacity: 1, delay: .5, ease: Sine.easeInOut})
		TweenLite.from(titanMesh.position, 2, {z: -200, y: 25, delay: .5, ease: Cubic.easeOut})
		
		TweenLite.to(wordmarkMat, 1.5, {opacity: 1, delay: 3,  ease: Sine.easeInOut})
		TweenLite.from(wordmarkMesh.position, 2, {z: -390, y: 52, delay: 3,  ease: Cubic.easeOut})		

		TweenLite.to(rheaMat, 1, {opacity: 1, delay: 1, ease: Sine.easeInOut})
		}
		
		
	}
	function createLight(){
		const pointLight = new THREE.PointLight(0xFFFFFF)

		pointLight.position.x = -100
		pointLight.position.y = 50
		pointLight.position.z = 100
		scene.add(pointLight);
		renderer.render(scene, camera);
	}

	//
	// events
	var tanFOV = Math.tan( ( ( Math.PI / 180 ) * cameraCSS.fov / 2 ) );
	var windowHeight = window.innerHeight;
	
	$(document).mousemove(function(e){
    mouseX = (e.pageX / WIDTH - .5) * 15
    mouseY = ((e.pageY - jQuery(document).scrollTop()) / WINDOWHEIGHT - .5) * 15
	})
	var header = $("#menu");
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 500) {
        header.addClass("hidden")
    } else {
        header.removeClass("hidden")
    }
  })
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
	function onWindowResize(event){
		cameraCSS.aspect = window.innerWidth / window.innerHeight; 
		camera.aspect = window.innerWidth / HEIGHT;
    cameraCSS.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
    cameraCSS.updateProjectionMatrix();
		camera.updateProjectionMatrix();
		renderer.setSize (window.innerWidth, HEIGHT );
		rendererCSS.setSize( window.innerWidth, window.innerHeight ); 
	}
})