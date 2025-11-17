document.addEventListener('DOMContentLoaded', function() {
    var yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (window.Typed && document.getElementById('hero-typed')) {
        new Typed('#hero-typed', {
            strings: [
                'Linux System Admin',
                'Full Stack Developer',
                'Data Scientist',
                'Founder & CEO, Sahoo Technologies Limited'
            ],
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 2000,
            smartBackspace: true,
            loop: true,
            cursorChar: '|'
        });
    }
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80
        });
    }
    if (window.gsap) {
        gsap.from('.hero h1', {
            opacity: 0,
            y: 24,
            duration: 0.9
        });
        gsap.from('.hero p', {
            opacity: 0,
            y: 18,
            duration: 0.9,
            delay: 0.15
        });
        gsap.from('.project-card', {
            opacity: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out'
        });

        var skillCards = document.querySelectorAll('.skill-group');
        skillCards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.15,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', function () {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('click', function () {
                skillCards.forEach(function (c) { c.classList.remove('is-active'); });
                card.classList.add('is-active');
            });
        });
    }

    // Three.js hacker-themed background
    if (window.THREE && document.getElementById('bg-canvas')) {
        var canvas = document.getElementById('bg-canvas');
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio || 1);

        var scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020617, 0.18);

        var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 12);

        var ambient = new THREE.AmbientLight(0x22c55e, 0.25);
        scene.add(ambient);
        var keyLight = new THREE.PointLight(0x38bdf8, 1.0, 40);
        keyLight.position.set(6, 8, 10);
        scene.add(keyLight);

        var cubes = [];
        var cubeMaterial1 = new THREE.MeshStandardMaterial({ color: 0x22c55e, metalness: 0.4, roughness: 0.3 });
        var cubeMaterial2 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.4, roughness: 0.3 });

        function addSymmetricCube(x, y, size, material) {
            var geo = new THREE.BoxGeometry(size, size, size);
            var mesh1 = new THREE.Mesh(geo, material);
            var mesh2 = new THREE.Mesh(geo, material);
            var mesh3 = new THREE.Mesh(geo, material);
            var mesh4 = new THREE.Mesh(geo, material);

            mesh1.position.set(x, y, 0);
            mesh2.position.set(-x, y, 0);
            mesh3.position.set(x, -y, 0);
            mesh4.position.set(-x, -y, 0);

            [mesh1, mesh2, mesh3, mesh4].forEach(function (m) {
                scene.add(m);
                cubes.push(m);
            });
        }

        for (var i = 0; i < 5; i++) {
            var offset = 1.4 + i * 0.9;
            var size = 0.4 + i * 0.12;
            addSymmetricCube(offset, offset, size, i % 2 === 0 ? cubeMaterial1 : cubeMaterial2);
        }

        var wireGeo = new THREE.BoxGeometry(7, 7, 0.05);
        var wireMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.08 });
        var wireFrame = new THREE.Mesh(wireGeo, wireMat);
        scene.add(wireFrame);

        // Tesseract-style wireframe (4D cube projection into 3D)
        var tesseract = new THREE.Group();
        var innerGeo = new THREE.BoxGeometry(2.8, 2.8, 2.8);
        var outerGeo = new THREE.BoxGeometry(4.6, 4.6, 4.6);
        var tesseractMat = new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.45 });

        var innerWire = new THREE.LineSegments(new THREE.EdgesGeometry(innerGeo), tesseractMat);
        var outerWire = new THREE.LineSegments(new THREE.EdgesGeometry(outerGeo), tesseractMat);

        tesseract.add(innerWire);
        tesseract.add(outerWire);

        var connectorMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
        var connectorGeom = new THREE.BufferGeometry();

        var innerVerts = innerGeo.attributes.position.array;
        var outerVerts = outerGeo.attributes.position.array;

        var connectorPositions = [];
        for (var iIdx = 0; iIdx < innerVerts.length; iIdx += 3) {
            var ix = innerVerts[iIdx];
            var iy = innerVerts[iIdx + 1];
            var iz = innerVerts[iIdx + 2];
            var ox = outerVerts[iIdx];
            var oy = outerVerts[iIdx + 1];
            var oz = outerVerts[iIdx + 2];
            connectorPositions.push(ix, iy, iz, ox, oy, oz);
        }

        connectorGeom.setAttribute('position', new THREE.Float32BufferAttribute(connectorPositions, 3));
        var connectors = new THREE.LineSegments(connectorGeom, connectorMat);
        tesseract.add(connectors);

        tesseract.position.set(0, 0, -2.2);
        scene.add(tesseract);

        function onResize() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        window.addEventListener('resize', onResize);
        onResize();

        var clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            var t = clock.getElapsedTime();

            cubes.forEach(function (cube, index) {
                var speed = 0.09 + index * 0.015;
                cube.rotation.x = t * speed;
                cube.rotation.y = t * (speed * 1.2);
                cube.position.z = Math.sin(t * 0.4 + index) * 1.2;
            });

            wireFrame.rotation.x = Math.sin(t * 0.15) * 0.25;
            wireFrame.rotation.y = Math.cos(t * 0.1) * 0.25;

            tesseract.rotation.x = t * 0.13;
            tesseract.rotation.y = t * 0.17;
            tesseract.rotation.z = Math.sin(t * 0.12) * 0.35;

            renderer.render(scene, camera);
        }

        animate();
    }
});
