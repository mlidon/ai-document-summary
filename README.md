# AI-Document-summary — Resumen inteligente de documentos con IA

Aplicación web para **resumir documentos PDF y texto** utilizando modelos locales a través de **Ollama** y un backend construido con **FastAPI**.  
Incluye una interfaz moderna desarrollada con **Astro**, subida de archivos mediante **drag & drop**, vista previa del resumen y un modal para lectura cómoda.

<img width="649" height="354" alt="image" src="https://github.com/user-attachments/assets/def6a1e8-727b-4498-92d6-65d1f3428aa7" />
---

## Características principales

-  Subida de documentos (PDF, TXT, DOCX)
-  Procesamiento rápido mediante FastAPI
-  Modelos locales usando Ollama (privacidad total)
-  Resumen estructurado y fácil de leer
-  Interfaz moderna con Astro + CSS responsive
-  Diseño adaptado a móvil
-  Procesamiento local sin enviar datos a terceros

---

##  Arquitectura del proyecto

```
frontend/ (Astro)
 ├── components/
 ├── pages/
 └── styles/

backend/
 ├── api.py
 ├── requirements.txt
 └── venv/

ollama/
 └── modelos locales (llama3, mistral, etc.)
```

---

## Tecnologías utilizadas

- FastAPI — Backend rápido y moderno  
- Python 3.10+  
- Ollama — Modelos LLM locales  
- Astro — Frontend ligero y modular  
- JavaScript — Lógica de subida y UI  
- CSS — Diseño responsive  
- Uvicorn — Servidor ASGI  

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
```

### 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
```

### 3. Instalar Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Descargar el modelo:

```bash
ollama pull llama3.1:8b 
```

---

## Ejecución

### Backend

```bash
uvicorn api:app --reload
```

Disponible en:

```
http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Disponible en:

```
http://localhost:4321
```

---

##  Uso

1. Abre la aplicación web  
2. Arrastra un documento a la zona de subida  
3. Espera al procesamiento  
4. Visualiza el resumen en el panel  
5. Abre el modal para leerlo con más comodidad  

---

## Capturas 

<img width="649" height="354" alt="image" src="https://github.com/user-attachments/assets/663053df-68cf-4c84-8a0c-1f47b255132f" />

<img width="732" height="758" alt="image" src="https://github.com/user-attachments/assets/fc62ff0f-9ab7-434b-97dd-6ca89d43049a" />


---

## Autor

Marc Lidón — Applied AI Engineer
```
