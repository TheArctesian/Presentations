# Use latest lightweight Python image
FROM python:3.11-slim

# Metadata
LABEL maintainer="Your Name <you@example.com>"
LABEL description="Dockerized Python Presentation Generator"

# Set work directory inside container
WORKDIR /app

# Copy the Python script into the container
COPY pres.py /app/pres.py

# Install dependencies (python-pptx)
RUN pip install --no-cache-dir python-pptx

# Optional: create output directory
RUN mkdir -p /output

# Run the script and save result to /output
CMD ["python", "pres.py"]
