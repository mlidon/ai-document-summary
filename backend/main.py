from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import summarize

# Crear instancia de la aplicación FastAPI
app = FastAPI(
    title="Document Summarizer API",
    description="API para subir documentos, extraer texto y generar resúmenes con Llama.",
    version="1.0.0"
)

# Configuración de CORS (permite que el frontend se conecte)
origins = [
    "http://localhost:4321",
    "http://localhost:3000",  # ejemplo: frontend en desarrollo
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar el router de resumen
app.include_router(summarize.router, prefix="/api", tags=["summarize"])

# Ruta raíz para comprobar que el backend funciona
@app.get("/")
def root():
    return {"message": "API de resumen funcionando correctamente"}