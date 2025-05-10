// Elementos del DOM
const envelope = document.querySelector('.envelope');
const letter = document.querySelector('.letter');
const container = document.querySelector('.container');
const flowers = document.querySelector('.flowers');

// Verificar si el dispositivo es táctil
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

// Adaptaciones para dispositivos táctil
if (isTouchDevice()) {
    // Cambiar la animación hover para dispositivos táctiles
    envelope.classList.add('touch-device');
    
    // Añadir indicación visual de que el sobre es interactivo
    const tapIndicator = document.createElement('div');
    tapIndicator.textContent = 'Toca para abrir';
    tapIndicator.style.position = 'absolute';
    tapIndicator.style.bottom = '-30px';
    tapIndicator.style.left = '50%';
    tapIndicator.style.transform = 'translateX(-50%)';
    tapIndicator.style.color = '#ff4081';
    tapIndicator.style.fontSize = '14px';
    tapIndicator.style.fontWeight = 'bold';
    tapIndicator.style.textAlign = 'center';
    tapIndicator.style.width = '100%';
    envelope.appendChild(tapIndicator);
    
    // Hacer que el indicador desaparezca cuando el sobre se abra
    envelope.addEventListener('click', () => {
        setTimeout(() => {
            tapIndicator.style.opacity = '0';
            tapIndicator.style.transition = 'opacity 0.5s ease';
        }, 300);
    });
}

// Crear flores decorativas
function createFlowers() {
    for (let i = 0; i < 8; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.style.top = `${Math.random() * 100}%`;
        flower.style.left = `${Math.random() * 100}%`;
        flower.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
        flower.style.opacity = `${0.3 + Math.random() * 0.4}`;
        flowers.appendChild(flower);
    }
}

createFlowers();

// Función para crear confeti
function createConfetti() {
    const confettiCount = window.innerWidth < 600 ? 30 : 50; // Menos confeti en móviles para mejor rendimiento
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Colores variados para el confeti
        const colors = ['#ff9ebb', '#ffb6c1', '#ff7ea6', '#ffebef', '#ffffff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.backgroundColor = randomColor;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${envelope.getBoundingClientRect().top}px`;
        
        // Formas aleatorias
        const shapes = ['circle', 'square', 'heart'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'heart') {
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = 'transparent';
            confetti.style.boxShadow = `inset -5px -5px 0 ${randomColor}`;
            confetti.style.transform = 'rotate(-45deg)';
            confetti.style.borderRadius = '50% 0 0 50%';
        }
        
        document.body.appendChild(confetti);
        
        // Animación para el confeti optimizada para rendimiento
        const animDuration = 1500 + Math.random() * 2000;
        const animationKeyframes = [
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${-50 + Math.random() * 100}px, ${Math.random() * 600}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ];
        
        const animation = confetti.animate(animationKeyframes, {
            duration: animDuration,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Hacer toda la carta clickeable
function openEnvelope() {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        
        // Ajustar la apertura de la carta según el tamaño de la pantalla
        setTimeout(() => {
            letter.classList.add('show');
            createConfetti();
            
            // Asegurarse de que la carta sea visible en pantallas más pequeñas
            if (window.innerHeight < 600) {
                const letterRect = letter.getBoundingClientRect();
                if (letterRect.top < 10) {
                    letter.style.transform = `translateY(${-letterRect.top + 20}px) scale(1)`;
                }
            }
            
            // Intento de añadir un efecto de sonido suave (funcionará si el usuario interactuó antes)
            try {
                const audio = new Audio('data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uSwAAAAAABLBQAAAL6QWkrN1AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
                audio.volume = 0.2;
                audio.play().catch(e => console.log('Audio play prevented:', e));
            } catch (e) {
                console.log('Audio not supported:', e);
            }
        }, 600);
    }
}

// Evento de clic en el sobre
envelope.addEventListener('click', openEnvelope);

// Añadir eventos para todas las partes del sobre para asegurar que sea clickeable
document.querySelector('.envelope-front').addEventListener('click', openEnvelope);
document.querySelector('.envelope-flap').addEventListener('click', openEnvelope);
document.querySelector('.heart').addEventListener('click', openEnvelope);

// Flores flotantes animadas con mejor rendimiento
document.querySelectorAll('.flower').forEach(flower => {
    const x = Math.random() * 20 - 10;
    const y = Math.random() * 20 - 10;
    const duration = 3 + Math.random() * 2;
    const delay = Math.random() * 2;
    
    // Usar transformación para mejor rendimiento
    const animationKeyframes = [
        { transform: `translate(0, 0) scale(${flower.style.transform.replace('scale(', '').replace(')', '')})` },
        { transform: `translate(${x}px, ${y}px) scale(${flower.style.transform.replace('scale(', '').replace(')', '')})` },
        { transform: `translate(0, 0) scale(${flower.style.transform.replace('scale(', '').replace(')', '')})` }
    ];
    
    flower.animate(animationKeyframes, {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
});

// Añadir un efecto decorativo más sutil en el fondo, optimizado para dispositivos móviles
function createBackgroundEffect() {
    // Verificar si es un dispositivo de bajo rendimiento
    const isLowEndDevice = () => {
        return (
            navigator.deviceMemory && navigator.deviceMemory < 4 || // Menos de 4GB de RAM
            navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4 // Menos de 4 núcleos
        );
    };
    
    // Si es un dispositivo de bajo rendimiento o móvil pequeño, omitir la animación de fondo
    if (isLowEndDevice() || window.innerWidth < 360) {
        return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.4';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function drawCircle(x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    // Reducir complejidad de la animación para dispositivos móviles
    const circleCount = window.innerWidth < 768 ? 3 : 5;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < circleCount; i++) {
            const x = Math.sin(time * 0.3 + i * 1.5) * 100 + canvas.width / 2;
            const y = Math.cos(time * 0.2 + i * 1.5) * 100 + canvas.height / 2;
            const size = 100 + Math.sin(time * 0.5 + i) * 20;
            drawCircle(x, y, size, `rgba(255, 158, 187, 0.05)`);
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Iniciar efecto de fondo después de un breve retraso para mejorar la carga inicial
setTimeout(() => {
    createBackgroundEffect();
}, 500);

// Gestión de orientación para dispositivos móviles
window.addEventListener('orientationchange', function() {
    // Reajustar la posición de la carta si está visible
    if (letter && letter.classList.contains('show')) {
        setTimeout(() => {
            const letterRect = letter.getBoundingClientRect();
            if (letterRect.top < 10) {
                letter.style.transform = `translateY(${-letterRect.top + 20}px) scale(1)`;
            }
        }, 300);
    }
});

// Detección específica para dispositivos HONOR (basado en agente de usuario)
function checkHonorDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('honor') || userAgent.includes('huawei')) {
        // Ajustes específicos para dispositivos HONOR/Huawei
        document.documentElement.classList.add('honor-device');
        
        // Añadir estilos específicos para HONOR
        const honorStyles = document.createElement('style');
        honorStyles.textContent = `
            .honor-device .letter {
                /* Los dispositivos HONOR suelen tener pantallas más densas */
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
            }
            .honor-device .envelope {
                /* Mejorar rendimiento táctil */
                touch-action: manipulation;
            }
        `;
        document.head.appendChild(honorStyles);
    }
}

// Ejecutar detección de dispositivo HONOR
checkHonorDevice();

// Asegurar que la página se vea correctamente después de cargar completamente
window.addEventListener('load', function() {
    // Forzar un reflow para asegurar que las animaciones se vean correctamente
    envelope.offsetHeight;
    
    // Asegurar que el sobre esté centrado correctamente
    setTimeout(() => {
        envelope.style.opacity = '1';
    }, 100);
});

// Detectar cuando la página pierde visibilidad para pausar animaciones y ahorrar recursos
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausar animaciones cuando la página no está visible
        document.querySelectorAll('.flower').forEach(flower => {
            const animations = flower.getAnimations();
            animations.forEach(animation => animation.pause());
        });
    } else {
        // Reanudar animaciones cuando la página vuelve a ser visible
        document.querySelectorAll('.flower').forEach(flower => {
            const animations = flower.getAnimations();
            animations.forEach(animation => animation.play());
        });
    }
});