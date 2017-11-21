$ = jQuery

jQuery(document).ready(function(){
	
	// setup 3D
	var mouseX, mouseY = 0
	const WIDTH = jQuery(window).width()
	const HEIGHT = 2000
	const WINDOWHEIGHT = $(window).height()
	const VIEW_ANGLE = 45
	const ASPECT = WIDTH / HEIGHT
	const screenAspect = WIDTH / WINDOWHEIGHT
	const NEAR = 0.1
	const FAR = 10000
	const container = document.querySelector('body')

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
  divMenu.position.z = 1200
	divMenu.rotation.z = Math.PI * 45
	
	sceneCSS = new THREE.Scene();
  sceneCSS.add(div)
	sceneCSS.add(divBorderFaded)
	sceneCSS.add(divMenu)
	
	///////////////
	// this needs to be replaced
	///////////////
	var fov
	switch(true){
		case (WINDOWHEIGHT < 550):
			fov = 25
			break;
		case (WINDOWHEIGHT >= 550 && WINDOWHEIGHT < 650):
			fov = 27.5
			break;
		case (WINDOWHEIGHT >= 650 && WINDOWHEIGHT < 750):
			fov = 29
			break;
		case (WINDOWHEIGHT >= 750 && WINDOWHEIGHT < 850):
			console.log('here')
			fov = 33
			break;
		case (WINDOWHEIGHT >= 850 && WINDOWHEIGHT < 950):
			fov = 39
			break;
		case (WINDOWHEIGHT >= 950 && WINDOWHEIGHT < 1050):
			fov = 43
			break;
		case (WINDOWHEIGHT >= 1050 && WINDOWHEIGHT < 1150):
			fov = 47
			break;
		case (WINDOWHEIGHT >= 1150 && WINDOWHEIGHT < 1250):
			fov = 50
			break;
		case (WINDOWHEIGHT >= 1150 && WINDOWHEIGHT < 1350):
			fov = 53
			break;
		case (WINDOWHEIGHT >= 1350 ):
			fov = 55
			break;
	}
	////////////////
	
	const cameraCSS = new THREE.PerspectiveCamera( fov, WIDTH / WINDOWHEIGHT, NEAR, FAR )
	sceneCSS.add(cameraCSS)
	cameraCSS.position.set(0,0,0)
	
	
	rendererCSS = new THREE.CSS3DRenderer();
  rendererCSS.setSize(WIDTH, WINDOWHEIGHT);
	// var rendererCSSdom = $(rendererCSS.domElement)
  rendererCSS.domElement.style.position = 'fixed';
  rendererCSS.domElement.style.top = 0
	rendererCSS.domElement.style.left = 0
  container.appendChild(rendererCSS.domElement);
	

	

	// else
	createPlanes()
	// createLight()
	requestAnimationFrame(update)
	
	//
	// setup
	function createPlanes(){
		
		//titan
		titanTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/titan.png" )
		const titanMat = new THREE.MeshBasicMaterial({ map: titanTex, transparent: true })
		const titanMesh = new THREE.Mesh( new THREE.PlaneGeometry(80,80), titanMat)
		titanMesh.position.z = -500
		titanMesh.position.y = 60
		scene.add(titanMesh)
		
		//saturn
		saturnTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/saturn.png" )
		const saturnMat = new THREE.MeshBasicMaterial({ map: saturnTex, transparent: true })
		const saturnMesh = new THREE.Mesh( new THREE.PlaneGeometry(1000,548), saturnMat)
		saturnMesh.position.z = -1000
		saturnMesh.position.y = 200
		scene.add(saturnMesh)
		
		//rhea
		rheaTex = new THREE.TextureLoader().load( "/wp-content/themes/fth/assets/images/titan_spread/moon.png" )
		const rheaMat = new THREE.MeshBasicMaterial({ map: rheaTex, transparent: true })
		const rheaMesh = new THREE.Mesh( new THREE.PlaneGeometry(15,15), rheaMat)
		rheaMesh.position.z = -800
		rheaMesh.position.x = 100
		rheaMesh.position.y = 200
		scene.add(rheaMesh)
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
	$(document).mousemove(function(e){     
    mouseX = (e.pageX / WIDTH - .5) * 15
    mouseY = ((e.pageY - jQuery(document).scrollTop()) / WINDOWHEIGHT - .5) * 15
	})
	
	var tanFOV = Math.tan( ( ( Math.PI / 180 ) * cameraCSS.fov / 2 ) );
	var windowHeight = window.innerHeight;
	
	function update(){
		camera.position.set(0 + mouseX, -jQuery(document).scrollTop() * .1 - mouseY, 0);
		cameraCSS.position.set(0 + mouseX * .5, 0 + mouseY * .5, 0);
		div.rotation.x = Math.PI * (mouseY * .001)
		div.rotation.y = Math.PI * (mouseX * -.001)
		divBorderFaded.rotation.x = Math.PI * (mouseY * .0012)
		divBorderFaded.rotation.y = Math.PI * (mouseX * -.0012)
		divMenu.rotation.x = Math.PI * (mouseY * .001)
		divMenu.rotation.y = Math.PI * (mouseX * -.001)
		// cameraCSS.position.set(new  THREE.Vector3(0 +mouseX	,0 - mouseY * .1,0));
		// cameraCSS.lookAt( new THREE.Vector3(0,0,1) );
		
		
		
	  renderer.render(scene, camera)
	  rendererCSS.render(sceneCSS, cameraCSS);
	  requestAnimationFrame(update)
	}
	
	// remember these initial values
	

	// Event Listeners
	// -----------------------------------------------------------------------------
	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize( event ) {

		cameraCSS.aspect = window.innerWidth / window.innerHeight;
    
			    // adjust the FOV
			    cameraCSS.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
    
			    cameraCSS.updateProjectionMatrix();
			    // cameraCSS.lookAt( sceneCSS.position );

			    rendererCSS.setSize( window.innerWidth, window.innerHeight );
	    // rendererCSS.render( sceneCSS, cameraCSS );
    
	}
})