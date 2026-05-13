from fastapi import APIRouter, UploadFile, File, HTTPException
from services.extract_text import extract_text
from services.llama_client import summarize_with_llama

router = APIRouter()

@router.get("/test")
def test():
    return {"message": "Router summarize funcionando"}

@router.post("/summarize")
async def summarize_document(file: UploadFile = File(...)):
    # Validación básica
    if not file.filename:
        raise HTTPException(status_code=400, detail="Archivo no válido")

    # Leer contenido del archivo
    content = await file.read()

    # Extraer texto según el tipo de archivo
    try:
        extracted_text = extract_text(
            content=content,
            content_type=file.content_type,
            filename=file.filename
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error extrayendo texto: {str(e)}"
        )

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No se pudo extraer texto del archivo"
        )

    # Llamar a Llama para generar el resumen
    try:
        summary = summarize_with_llama(extracted_text)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generando resumen con Llama: {str(e)}"
        )

    # Respuesta final
    return {
        "filename": file.filename,
        "summary": summary
    }
