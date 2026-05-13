import requests

# URL del servidor Ollama
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.1:8b"  # Cambia aquí si usas otro modelo


def build_summary_prompt(text: str) -> str:
    """
    Construye el prompt que se enviará al modelo Llama.
    """
    return f"""
Eres un asistente experto en resumir documentos largos.

Tu tarea:
- Resume el siguiente texto de forma clara, estructurada y concisa.
- Devuelve el resultado en español.
- Organiza el resumen en:
  1. Idea principal
  2. Puntos clave
  3. Datos relevantes
  4. Conclusión

Texto a resumir:
{text}
"""


def summarize_with_llama(text: str) -> str:
    """
    Envía el texto al modelo Llama (Ollama) y devuelve el resumen generado.
    """
    prompt = build_summary_prompt(text)

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        },
        timeout=120
    )

    if response.status_code != 200:
        raise RuntimeError(
            f"Error llamando a Llama: {response.status_code} - {response.text}"
        )

    data = response.json()

    # Ollama devuelve el texto en el campo "response"
    return data.get("response", "").strip()
