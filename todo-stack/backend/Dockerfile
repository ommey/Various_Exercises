FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# code
COPY app/ ./app/

# non-root (optional)
RUN useradd -m appuser && chown -R appuser /app
USER appuser

EXPOSE 8000

# ✅ make sure we point to the package module path
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
