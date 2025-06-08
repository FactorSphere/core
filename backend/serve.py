from flask import Flask, request, jsonify
from flask_cors import CORS
import faiss
import json
from sentence_transformers import SentenceTransformer
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the journal metadata and FAISS index
with open("journal_metadata.json", "r", encoding="utf-8") as f:
    journal_metadata = json.load(f)

index = faiss.read_index("journal_index.faiss")

# Load the sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    abstract = data.get("abstract", "")
    if not abstract:
        return jsonify([])

    # Compute embedding for input abstract
    query_vector = model.encode([abstract])
    query_vector = np.array(query_vector).astype('float32')

    # Search in FAISS index
    k = 5  # number of recommendations
    distances, indices = index.search(query_vector, k)

    results = []
    for idx in indices[0]:
        if idx < len(journal_metadata):
            results.append(journal_metadata[idx])

    return jsonify(results)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
