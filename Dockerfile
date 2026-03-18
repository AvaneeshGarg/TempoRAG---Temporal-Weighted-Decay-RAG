FROM python:3.11-slim

WORKDIR /app

# Install libgomp1 (required by PyTorch CPU) and clean up apt cache
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install CPU-only PyTorch FIRST to save space and avoid CUDA bloat
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir \
        torch \
        --index-url https://download.pytorch.org/whl/cpu

# Install the rest of the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY backend/ ./backend/
COPY src/ ./src/
COPY data/ ./data/

# Create evaluation results directory
RUN mkdir -p evaluation/results

# Railway injects $PORT automatically
EXPOSE 8001

# The shell form is required to expand the $PORT environment variable
CMD uvicorn backend.app:app --host 0.0.0.0 --port ${PORT:-8001} --workers 1
