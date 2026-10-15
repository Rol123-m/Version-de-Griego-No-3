document.addEventListener('DOMContentLoaded', function() {
    // Elementos de palabras griegas
    const wordElements = document.querySelectorAll('l');
    const grammarModal = createGrammarModal();
    document.body.appendChild(grammarModal);
    
    // Diccionario mejorado de códigos gramaticales
    const grammarMap = {
        // Tipos principales
        'N': {name: 'Sustantivo', color: '#3498db'},
        'V': {name: 'Verbo', color: '#e74c3c'},
        'A': {name: 'Adjetivo', color: '#2ecc71'},
        'PREP': {name: 'Preposición', color: '#9b59b6'},
        'CONJ': {name: 'Conjunción', color: '#f39c12'},
        'PRT': {name: 'Partícula', color: '#1abc9c'},
        'ADV': {name: 'Adverbio', color: '#34495e'},
        'D': {name: 'Demostrativo', color: '#d35400'},
        'R': {name: 'Pronombre Relativo', color: '#27ae60'},
        'P': {name: 'Pronombre Personal', color: '#8e44ad'},
        'T': {name: 'Artículo', color: '#c0392b'},
        'I': {name: 'Interrogativo', color: '#16a085'},
        'HEB': {name: 'Palabra Hebrea', color: '#7f8c8d'},
        'K': {name: 'Relativo Indefinido', color: '#2980b9'},
        'F': {name: 'Pronombre Reflexivo', color: '#f1c40f'},
        'COND': {name: 'Conjunción Condicional', color: '#e67e22'},
        'N-PRI': {name: 'Nombre Propio', color: '#2c3e50'}
    };
    
    const caseMap = {
        'N': 'Nominativo',
        'G': 'Genitivo',
        'D': 'Dativo',
        'A': 'Acusativo',
        'V': 'Vocativo',
        'X': 'No especificado'
    };
    
    const genderMap = {
        'M': 'Masculino',
        'F': 'Femenino',
        'N': 'Neutro',
        'C': 'Común',
        'X': 'No especificado'
    };
    
    const numberMap = {
        'S': 'Singular',
        'P': 'Plural',
        'X': 'No especificado'
    };
    
    const tenseMap = {
        'P': 'Presente',
        'I': 'Imperfecto',
        'F': 'Futuro',
        'A': 'Aoristo',
        'R': 'Perfecto',
        'L': 'Pluscuamperfecto',
        'X': 'No especificado'
    };
    
    const voiceMap = {
        'A': 'Activa',
        'M': 'Media',
        'P': 'Pasiva',
        'E': 'Media-Pasiva',
        'X': 'No especificado'
    };
    
    const moodMap = {
        'I': 'Indicativo',
        'S': 'Subjuntivo',
        'O': 'Optativo',
        'M': 'Imperativo',
        'N': 'Infinitivo',
        'P': 'Participio',
        'X': 'No especificado'
    };
    
    // Mapeo de Strong's numbers para Juan 1 (ejemplos)
    const strongsDictionary = {
        'G1722': {word: 'ἐν', meaning: 'en, dentro de', transliteration: 'en'},
        'G746': {word: 'ἀρχῇ', meaning: 'principio, comienzo', transliteration: 'archē'},
        'G1510': {word: 'ἦν', meaning: 'era, estaba', transliteration: 'ēm'},
        'G3588': {word: 'ὁ', meaning: 'el, la, lo', transliteration: 'ho'},
        'G3056': {word: 'λόγος', meaning: 'palabra, discurso, Verbo', transliteration: 'logos'},
        'G2316': {word: 'θεός', meaning: 'Dios, divinidad', transliteration: 'theos'},
        'G4314': {word: 'πρός', meaning: 'hacia, con, para', transliteration: 'pros'},
        'G2532': {word: 'καί', meaning: 'y, también', transliteration: 'kai'},
        'G5457': {word: 'φῶς', meaning: 'luz', transliteration: 'phōs'},
        'G444': {word: 'ἄνθρωπος', meaning: 'hombre, humano', transliteration: 'anthrōpos'},
        'G5316': {word: 'φαίνω', meaning: 'brillar, aparecer', transliteration: 'phainō'},
        'G4653': {word: 'σκοτία', meaning: 'oscuridad', transliteration: 'skotia'},
        'G2638': {word: 'καταλαμβάνω', meaning: 'aprehender, comprender', transliteration: 'katalambanō'},
        'G649': {word: 'ἀποστέλλω', meaning: 'enviar', transliteration: 'apostellō'},
        'G3844': {word: 'παρά', meaning: 'de, desde, junto a', transliteration: 'para'},
        'G2491': {word: 'Ἰωάννης', meaning: 'Juan', transliteration: 'Iōannēs'},
        'G2064': {word: 'ἔρχομαι', meaning: 'venir, ir', transliteration: 'erchomai'},
        'G3141': {word: 'μαρτυρία', meaning: 'testimonio', transliteration: 'martyria'},
        'G2443': {word: 'ἵνα', meaning: 'para que, a fin de que', transliteration: 'hina'},
        'G4012': {word: 'περί', meaning: 'acerca de, alrededor de', transliteration: 'peri'},
        'G4100': {word: 'πιστεύω', meaning: 'creer, confiar', transliteration: 'pisteuō'},
        'G1565': {word: 'ἐκεῖνος', meaning: 'aquel, ese', transliteration: 'ekeinos'},
        'G228': {word: 'ἀληθινός', meaning: 'verdadero, genuino', transliteration: 'alēthinos'},
        'G5461': {word: 'φωτίζω', meaning: 'iluminar', transliteration: 'phōtizō'},
        'G2889': {word: 'κόσμος', meaning: 'mundo, universo', transliteration: 'kosmos'},
        'G1097': {word: 'γινώσκω', meaning: 'conocer, saber', transliteration: 'ginōskō'}
    };
    
    // Añadir eventos a cada palabra
    wordElements.forEach(word => {
        word.style.cursor = 'pointer';
        word.style.transition = 'all 0.2s ease';
        word.style.position = 'relative';
        
        // Añadir tooltip básico
        word.setAttribute('title', 'Haz clic para información gramatical');
        
        word.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const grammarCode = this.getAttribute('m');
            const strongNumber = this.getAttribute('s');
            const wordText = this.textContent.trim();
            
            console.log('Palabra clickeada:', wordText, 'Código:', grammarCode, 'Strong:', strongNumber);
            
            showGrammarInfo(this, grammarCode, wordText, strongNumber);
        });
        
        // Efectos hover mejorados
        word.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(52, 152, 219, 0.15)';
            this.style.borderRadius = '4px';
            this.style.padding = '2px 6px';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        
        word.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.padding = '0 2px';
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Función para mostrar información gramatical
    function showGrammarInfo(element, grammarCode, wordText, strongNumber) {
        console.log('Mostrando info para:', wordText, grammarCode);
        
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // Posicionar el modal
        let modalTop = rect.bottom + scrollTop + 10;
        let modalLeft = rect.left + scrollLeft;
        
        // Ajustar para pantallas pequeñas
        if (window.innerWidth < 768) {
            modalTop = scrollTop + 100;
            modalLeft = Math.max(10, (window.innerWidth - 320) / 2);
        }
        
        grammarModal.style.top = modalTop + 'px';
        grammarModal.style.left = modalLeft + 'px';
        
        // Parsear el código gramatical
        const parsedGrammar = parseGrammarCode(grammarCode);
        const strongInfo = strongsDictionary[strongNumber] || {meaning: 'Información no disponible', transliteration: 'N/A'};
        
        // Construir el contenido del modal
        let htmlContent = `
            <div class="grammar-header" style="background: ${parsedGrammar.color || '#2c3e50'}">
                <div class="word-display">
                    <h3>${wordText}</h3>
                    <span class="transliteration">${strongInfo.transliteration}</span>
                </div>
                <button class="close-btn">&times;</button>
            </div>
            <div class="grammar-content">
                <div class="grammar-section">
                    <h4><i class="fas fa-book"></i> Significado</h4>
                    <div class="meaning-box">
                        <p><strong>Strong's ${strongNumber || 'N/A'}:</strong> ${strongInfo.meaning}</p>
                    </div>
                </div>
                
                <div class="grammar-section">
                    <h4><i class="fas fa-language"></i> Análisis Gramatical</h4>
                    <div class="grammar-details">
                        <div class="grammar-type">
                            <span class="grammar-label">Tipo:</span>
                            <span class="grammar-value">${parsedGrammar.type || 'No especificado'}</span>
                        </div>
        `;
        
        // Añadir detalles gramaticales si existen
        if (parsedGrammar.details.length > 0) {
            htmlContent += '<div class="grammar-grid">';
            parsedGrammar.details.forEach(detail => {
                htmlContent += `
                    <div class="grammar-item">
                        <span class="grammar-label">${detail.label}:</span>
                        <span class="grammar-value">${detail.value}</span>
                    </div>
                `;
            });
            htmlContent += '</div>';
        }
        
        htmlContent += `
                    </div>
                </div>
                
                <div class="grammar-section">
                    <h4><i class="fas fa-external-link-alt"></i> Recursos Externos</h4>
                    <div class="resources">
                        <a href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?strongs=${strongNumber || ''}&t=KJV" 
                           target="_blank" class="resource-btn" data-action="blueletter">
                            <i class="fas fa-external-link-alt"></i> Blue Letter Bible
                        </a>
                        <a href="https://biblehub.com/greek/${strongNumber || ''}.htm" 
                           target="_blank" class="resource-btn" data-action="biblehub">
                            <i class="fas fa-globe"></i> Bible Hub
                        </a>
                        <a href="https://www.studylight.org/lexicons/greek/${strongNumber || ''}.html" 
                           target="_blank" class="resource-btn" data-action="studylight">
                            <i class="fas fa-search"></i> StudyLight
                        </a>
                    </div>
                </div>
                
                <div class="grammar-section">
                    <h4><i class="fas fa-info-circle"></i> Ayuda</h4>
                    <div class="help-text">
                        <p>El código gramatical "${grammarCode}" indica la función de esta palabra en el texto original.</p>
                    </div>
                </div>
            </div>
        `;
        
        grammarModal.innerHTML = htmlContent;
        grammarModal.style.display = 'block';
        
        // Forzar reflow para animación
        grammarModal.offsetHeight;
        grammarModal.style.opacity = '1';
        grammarModal.style.transform = 'translateY(0) scale(1)';
        
        // Añadir evento al botón de cerrar
        const closeBtn = grammarModal.querySelector('.close-btn');
        closeBtn.addEventListener('click', hideGrammarModal);
    }
    
    // Función para parsear el código gramatical
    function parseGrammarCode(code) {
        if (!code) return {type: 'No especificado', details: [], color: '#7f8c8d'};
        
        const parts = code.split('-');
        const mainType = parts[0];
        const details = parts.slice(1);
        
        const typeInfo = grammarMap[mainType] || {name: mainType, color: '#7f8c8d'};
        const parsedDetails = [];
        
        // Procesar cada parte del código
        details.forEach(detail => {
            // Para códigos como "NSM" (Nominativo Singular Masculino)
            if (detail.length === 3) {
                const caseCode = detail[0];
                const numberCode = detail[1];
                const genderCode = detail[2];
                
                if (caseMap[caseCode]) parsedDetails.push({label: 'Caso', value: caseMap[caseCode]});
                if (numberMap[numberCode]) parsedDetails.push({label: 'Número', value: numberMap[numberCode]});
                if (genderMap[genderCode]) parsedDetails.push({label: 'Género', value: genderMap[genderCode]});
            }
            // Para códigos de verbos como "PAI-3S" (Presente Activo Indicativo - 3a persona Singular)
            else if (detail.length >= 3 && detail.length <= 4) {
                const tenseCode = detail[0];
                const voiceCode = detail[1];
                const moodCode = detail[2];
                const personNumber = detail.length === 4 ? detail[3] : null;
                
                if (tenseMap[tenseCode]) parsedDetails.push({label: 'Tiempo', value: tenseMap[tenseCode]});
                if (voiceMap[voiceCode]) parsedDetails.push({label: 'Voz', value: voiceMap[voiceCode]});
                if (moodMap[moodCode]) parsedDetails.push({label: 'Modo', value: moodMap[moodCode]});
                if (personNumber) {
                    const person = personNumber === '1' ? '1ra' : personNumber === '2' ? '2da' : '3ra';
                    parsedDetails.push({label: 'Persona', value: `${person} persona`});
                }
            }
            // Para números como "3S" (3a persona Singular)
            else if (/^\d+[SP]$/.test(detail)) {
                const person = detail[0] === '1' ? '1ra' : detail[0] === '2' ? '2da' : '3ra';
                const number = detail.includes('S') ? 'Singular' : 'Plural';
                parsedDetails.push({label: 'Persona', value: `${person} persona ${number.toLowerCase()}`});
            }
        });
        
        return {
            type: typeInfo.name,
            details: parsedDetails,
            color: typeInfo.color,
            rawCode: code
        };
    }
    
    function hideGrammarModal() {
        grammarModal.style.opacity = '0';
        grammarModal.style.transform = 'translateY(10px) scale(0.95)';
        setTimeout(() => {
            grammarModal.style.display = 'none';
        }, 300);
    }
    
    function createGrammarModal() {
        const modal = document.createElement('div');
        modal.id = 'grammar-modal';
        modal.style.cssText = `
            position: absolute;
            background: white;
            border-radius: 12px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.25);
            width: 350px;
            max-width: 95vw;
            z-index: 10000;
            display: none;
            opacity: 0;
            transform: translateY(10px) scale(0.95);
            transition: opacity 0.3s ease, transform 0.3s ease;
            border: none;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        `;
        return modal;
    }
    
    // Cerrar modal al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (grammarModal.style.display === 'block' && 
            !grammarModal.contains(e.target) && 
            !e.target.closest('l')) {
            hideGrammarModal();
        }
    });
    
    // Tecla Escape para cerrar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && grammarModal.style.display === 'block') {
            hideGrammarModal();
        }
    });
    
    // Añadir estilos CSS mejorados
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        #grammar-modal {
            animation: modalAppear 0.3s ease-out;
        }
        
        @keyframes modalAppear {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        #grammar-modal .grammar-header {
            padding: 20px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            background: linear-gradient(135deg, #2c3e50, #1a4b7a);
        }
        
        #grammar-modal .word-display {
            flex: 1;
        }
        
        #grammar-modal .grammar-header h3 {
            margin: 0 0 5px 0;
            font-size: 1.8rem;
            font-weight: 600;
            font-family: 'Gentium', serif;
        }
        
        #grammar-modal .transliteration {
            font-size: 0.9rem;
            opacity: 0.9;
            font-style: italic;
        }
        
        #grammar-modal .close-btn {
            background: rgba(255,255,255,0.15);
            border: none;
            color: white;
            font-size: 1.8rem;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            margin-left: 15px;
            padding: 0;
            line-height: 1;
        }
        
        #grammar-modal .close-btn:hover {
            background: rgba(255,255,255,0.25);
            transform: rotate(90deg);
        }
        
        #grammar-modal .grammar-content {
            padding: 0;
        }
        
        #grammar-modal .grammar-section {
            padding: 20px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        #grammar-modal .grammar-section:last-child {
            border-bottom: none;
        }
        
        #grammar-modal .grammar-section h4 {
            margin: 0 0 15px 0;
            font-size: 1rem;
            color: #2c3e50;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        #grammar-modal .grammar-section h4 i {
            color: #3498db;
        }
        
        #grammar-modal .meaning-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #2ecc71;
        }
        
        #grammar-modal .meaning-box p {
            margin: 0;
            line-height: 1.6;
        }
        
        #grammar-modal .grammar-details {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        #grammar-modal .grammar-type {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        #grammar-modal .grammar-label {
            font-weight: 600;
            color: #2c3e50;
            font-size: 0.9rem;
        }
        
        #grammar-modal .grammar-value {
            font-weight: 500;
            color: #1a4b7a;
        }
        
        #grammar-modal .grammar-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 10px;
            margin-top: 10px;
        }
        
        #grammar-modal .grammar-item {
            background: #f0f7ff;
            padding: 10px 15px;
            border-radius: 6px;
            border-left: 3px solid #3498db;
        }
        
        #grammar-modal .grammar-item .grammar-label {
            display: block;
            font-size: 0.8rem;
            color: #7f8c8d;
            margin-bottom: 2px;
        }
        
        #grammar-modal .grammar-item .grammar-value {
            font-size: 0.95rem;
            color: #2c3e50;
        }
        
        #grammar-modal .resources {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        #grammar-modal .resource-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 15px;
            background: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            text-decoration: none;
            color: #2c3e50;
            transition: all 0.2s ease;
            font-size: 0.9rem;
        }
        
        #grammar-modal .resource-btn:hover {
            background: #e3f2fd;
            border-color: #3498db;
            transform: translateX(5px);
            color: #1a4b7a;
        }
        
        #grammar-modal .resource-btn i {
            color: #3498db;
            width: 16px;
        }
        
        #grammar-modal .help-text {
            font-size: 0.85rem;
            color: #7f8c8d;
            line-height: 1.5;
        }
        
        /* Palabra clickeada */
        l.active {
            background: linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(41, 128, 185, 0.3)) !important;
            border-radius: 4px !important;
            padding: 2px 8px !important;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3) !important;
            transform: scale(1.05) !important;
            z-index: 1000;
            position: relative;
        }
        
        /* Para dispositivos móviles */
        @media (max-width: 768px) {
            #grammar-modal {
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 95%;
                max-height: 85vh;
                overflow-y: auto;
            }
            
            #grammar-modal .grammar-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 480px) {
            #grammar-modal .grammar-header {
                padding: 15px;
            }
            
            #grammar-modal .grammar-header h3 {
                font-size: 1.5rem;
            }
            
            #grammar-modal .grammar-section {
                padding: 15px;
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Añadir estilo para resaltar la palabra clickeada
    document.addEventListener('click', function(e) {
        if (e.target.closest('l')) {
            // Remover clase active de todas las palabras
            document.querySelectorAll('l').forEach(w => w.classList.remove('active'));
            // Añadir clase active a la palabra clickeada
            e.target.closest('l').classList.add('active');
        } else if (!e.target.closest('#grammar-modal')) {
            // Remover clase active si se hace clic fuera
            document.querySelectorAll('l').forEach(w => w.classList.remove('active'));
        }
    });
});