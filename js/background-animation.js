// Three.js Background Animation
class BackgroundAnimation {
    constructor() {
        try {
            // Check if Three.js is loaded
            if (typeof THREE === 'undefined') {
                console.error('Three.js is not loaded');
                return;
            }

            this.container = document.createElement('div');
            this.container.className = 'background-animation';
            document.body.insertBefore(this.container, document.body.firstChild);

            // Scene setup
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: true
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.container.appendChild(this.renderer.domElement);

            // Restaurant-themed colors
            this.colors = {
                warmGold: new THREE.Color('#FFD700'),    // Warm gold for ambiance
                deepRed: new THREE.Color('#8B0000'),     // Deep red for richness
                warmBrown: new THREE.Color('#8B4513'),   // Warm brown for comfort
                cream: new THREE.Color('#FFFDD0')        // Cream for elegance
            };

            // Initialize particles
            this.initParticles();

            // Camera position
            this.camera.position.z = 30;

            // Mouse movement for parallax
            this.mouseX = 0;
            this.mouseY = 0;
            this.targetX = 0;
            this.targetY = 0;
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;

            // Event listeners
            this.bindEvents();
            
            // Start animation
            this.animate();

            console.log('Restaurant-themed background animation initialized successfully');
        } catch (error) {
            console.error('Error initializing background animation:', error);
        }
    }

    initParticles() {
        try {
            const particleCount = 150; // Increased particle count for richer effect
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);

            for (let i = 0; i < particleCount; i++) {
                // Position with more spread
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

                // Random restaurant-themed color
                const colorArray = [
                    this.colors.warmGold,
                    this.colors.deepRed,
                    this.colors.warmBrown,
                    this.colors.cream
                ];
                const color = colorArray[Math.floor(Math.random() * colorArray.length)];
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;

                // Varied particle sizes
                sizes[i] = Math.random() * 2 + 0.5;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.PointsMaterial({
                size: 1,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true
            });

            this.particleSystem = new THREE.Points(geometry, material);
            this.scene.add(this.particleSystem);

        } catch (error) {
            console.error('Error initializing particles:', error);
        }
    }

    bindEvents() {
        try {
            document.addEventListener('mousemove', (event) => {
                this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
                this.mouseY = (event.clientY - this.windowHalfY) * 0.05;
            });

            window.addEventListener('resize', () => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.windowHalfX = window.innerWidth / 2;
                this.windowHalfY = window.innerHeight / 2;
            });
        } catch (error) {
            console.error('Error binding events:', error);
        }
    }

    animate() {
        try {
            requestAnimationFrame(this.animate.bind(this));

            // Smooth mouse movement
            this.targetX = this.mouseX * 0.001;
            this.targetY = this.mouseY * 0.001;

            // Update particles with gentle floating motion
            if (this.particleSystem) {
                this.particleSystem.rotation.x += 0.0003;
                this.particleSystem.rotation.y += 0.0003;

                const positions = this.particleSystem.geometry.attributes.position.array;
                const time = Date.now() * 0.001;

                for (let i = 0; i < positions.length; i += 3) {
                    // Create gentle floating motion
                    positions[i + 1] += Math.sin(time + i * 0.1) * 0.02;
                    positions[i] += Math.cos(time + i * 0.1) * 0.02;
                }
                this.particleSystem.geometry.attributes.position.needsUpdate = true;
            }

            // Update camera position for parallax
            this.camera.position.x += (this.targetX - this.camera.position.x) * 0.05;
            this.camera.position.y += (this.targetY - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);

            this.renderer.render(this.scene, this.camera);
        } catch (error) {
            console.error('Error in animation loop:', error);
        }
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing restaurant-themed background animation...');
    new BackgroundAnimation();
}); 